import { Request, Response } from "express";
import * as fs from "fs";

import { productRepository } from "../repositories/productRepository";
import { productImageRepository } from "../repositories/productImageRepository";
import { categoriesRepository } from "../repositories/categoriesRepository";
import { uploadImage } from "../services/cloudinaryService";
import AppDataSource from "../ormconfig";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { isClient } = req as any;
    const { categoryId } = req.query;

    const productsQuery = productRepository
      .createQueryBuilder("product")
      .innerJoinAndSelect(
        "product.category",
        "category",
        "category.isRemoved = 0"
      )
      .leftJoinAndSelect(
        "product.images",
        "images",
        "images.productId = product.id"
      )
      .where(isClient ? "product.isRemoved = :isRemoved" : "1=1", {
        isRemoved: false,
      })
      .orderBy("product.createdAt", "DESC")
      .select([
        "category.id",
        "category.name",
        "category.slug",
        "product.id",
        "product.code",
        "product.name",
        "product.slug",
        "product.description",
        "product.information",
        "product.isNew",
        "product.isBestSeller",
        "product.price",
        ...(isClient
          ? []
          : ["product.isRemoved", "product.createdAt", "images.isRemoved"]),
        "images.id",
        "images.imageUrl",
      ]);

    if (categoryId) {
      productsQuery.andWhere("product.categoryId = :categoryId", {
        categoryId,
      });
    }

    const products = await productsQuery.getMany();

    res.json(products);
  } catch (err) {
    console.error("Error getting products:", err);
    res.status(500).json({ message: "Error getting products" });
  }
};

export const getProductBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { isClient } = req as any;
    const { slug } = req.params;

    const productQuery = productRepository
      .createQueryBuilder("product")
      .innerJoinAndSelect(
        "product.category",
        "category",
        "category.isRemoved = 0"
      )
      .leftJoinAndSelect(
        "product.images",
        "images",
        "images.productId = product.id"
      )
      .where(isClient ? "product.isRemoved = :isRemoved" : "1=1", {
        isRemoved: false,
      })
      .andWhere("product.slug = :slug", { slug })
      .orderBy("product.createdAt", "DESC")
      .select([
        "category.id",
        "category.name",
        "category.slug",
        "category.logoURL",
        "product.id",
        "product.code",
        "product.name",
        "product.slug",
        "product.description",
        "product.information",
        "product.isNew",
        "product.isBestSeller",
        "product.price",
        ...(isClient
          ? []
          : [
              "product.price",
              "product.isRemoved",
              "product.createdAt",
              "images.isRemoved",
            ]),
        "images.id",
        "images.imageUrl",
      ]);

    const product = await productQuery.getOne();

    res.json(product);
  } catch (err) {
    console.error("Error getting product:", err);
    res.status(500).json({ message: "Error getting product" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const productRepo =
        transactionalEntityManager.withRepository(productRepository);
      const categoriesRepo =
        transactionalEntityManager.withRepository(categoriesRepository);
      const productImageRepo = transactionalEntityManager.withRepository(
        productImageRepository
      );

      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        res.status(400).json({ message: "No images uploaded" });
      }

      const { categoryId } = req.body;

      const existedCategory = await categoriesRepo.findOne({
        where: { id: categoryId },
      });

      if (!existedCategory) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      const existedProductByCode = await productRepo.findOne({
        where: { code: req.body.code },
      });

      if (existedProductByCode) {
        res.status(400).json({ message: "Product code already exists" });
        return;
      }

      const existedProductBySlug = await productRepo.findOne({
        where: { code: req.body.slug },
      });

      if (existedProductBySlug) {
        res.status(400).json({ message: "Product slug already exists" });
        return;
      }

      const newProduct = productRepo.create({
        ...req.body,
        isNew: req.body.isNew === "true",
        isBestSeller: req.body.isBestSeller === "true",
        ...(req.body.price ? { price: parseFloat(req.body.price) } : {}),
        category: { id: categoryId },
      });

      const product = await productRepo.save(newProduct);

      await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const result = await uploadImage(file.path);
          fs.unlinkSync(file.path);

          const productImage = productImageRepo.create({
            imageUrl: result.secure_url,
            product: product as any,
          });
          await productImageRepo.save(productImage);
        })
      );

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (product.code !== req.body.code) {
      const existedProduct = await productRepository.findOne({
        where: { code: req.body.code },
      });

      if (existedProduct) {
        res.status(400).json({ message: "Product code already exists" });
        return;
      }
    }

    if (product.slug !== req.body.slug) {
      const existedProductSlug = await productRepository.findOne({
        where: { code: req.body.slug },
      });

      if (existedProductSlug) {
        res.status(400).json({ message: "Product slug already exists" });
        return;
      }
    }

    const updatedProduct = productRepository.merge({
      ...product,
      ...req.body,
      isNew: req.body.isNew === "true",
      isBestSeller: req.body.isBestSeller === "true",
      ...(req.body.price ? { price: parseFloat(req.body.price) } : {}),
      category: { id: req.body.categoryId },
    });

    await productRepository.save(updatedProduct);

    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const uploadPromises = (req.files as Express.Multer.File[]).map(
        async (file) => {
          const result = await uploadImage(file.path);
          const imageUrl = result.secure_url;

          fs.unlinkSync(file.path);

          const productImage = productImageRepository.create({
            imageUrl: imageUrl,
            product: updatedProduct as any,
          });

          await productImageRepository.save(productImage);
        }
      );
      await Promise.all(uploadPromises);
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Error updating product" });
  }
};

// delete product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    product.isRemoved = req.body.isRemoved;
    await productRepository.save(product);

    res.json({ message: "Product removed" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
};

export const updateProductImageUsed = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { isRemoved } = req.body;

    const productImage = await productImageRepository.findOne({
      where: { id: Number(id) },
    });

    if (!productImage) {
      res.status(404).json({ message: "Product image not found" });
      return;
    }

    productImage.isRemoved = isRemoved;

    await productImageRepository.save(productImage);

    res.json({ message: "Product image updated" });
  } catch (err) {
    console.error("Error updating product image:", err);
    res.status(500).json({ message: "Error updating product image" });
  }
};

export const searchProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { keyword } = req.query;

    const products = await productRepository
      .createQueryBuilder("product")
      .innerJoin("product.category", "category", "category.isRemoved = 0")
      .leftJoin("product.images", "images", "images.productId = product.id")
      .where("product.name LIKE :keyword", { keyword: `%${keyword}%` })
      .orWhere("product.code LIKE :keyword", { keyword: `%${keyword}%` })
      .orWhere("category.name LIKE :keyword", { keyword: `%${keyword}%` })
      .orWhere("category.slug LIKE :keyword", { keyword: `%${keyword}%` })
      .select([
        "category.id",
        "category.name",
        "category.slug",
        "product.id",
        "product.code",
        "product.name",
        "product.slug",
        "images.id",
        "images.imageUrl",
      ])
      .getMany();

    res.json(products);
  } catch (err) {
    console.error("Error searching products:", err);
    res.status(500).json({ message: "Error searching products" });
  }
};
