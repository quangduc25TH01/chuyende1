import { Request, Response } from "express";
import * as fs from "fs";
import { categoriesRepository } from "../repositories/categoriesRepository";
import { uploadImage } from "../services/cloudinaryService";

const deleteFiles = (files: { [fieldname: string]: Express.Multer.File[] }) => {
  if (files.logo) fs.unlinkSync(files.logo[0].path);
  if (files.image) fs.unlinkSync(files.image[0].path);
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { isClient } = req as any;

  const categories = await categoriesRepository
    .createQueryBuilder("category")
    .where(isClient ? "category.isRemoved = :isRemoved" : "1=1", {
      isRemoved: false,
    })
    .select([
      "category.id",
      "category.name",
      "category.slug",
      "category.logoURL",
      "category.imageURL",
      ...(isClient
        ? []
        : ["category.createdAt", "category.updatedAt", "category.isRemoved"]),
    ])
    .orderBy("category.createdAt", "ASC")
    .getMany();

  res.json(categories);
};

export const getCategoryBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { isClient } = req as any;
  const { slug } = req.params;

  const category = await categoriesRepository
    .createQueryBuilder("category")
    .where(isClient ? "category.isRemoved = :isRemoved" : "1=1", {
      isRemoved: false,
    })
    .andWhere("category.slug = :slug", { slug })
    .select([
      "category.id",
      "category.name",
      "category.slug",
      "category.logoURL",
      "category.imageURL",
      ...(isClient
        ? []
        : ["category.createdAt", "category.updatedAt", "category.isRemoved"]),
    ])
    .orderBy("category.createdAt", "ASC")
    .getOne();

  res.json(category);
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, slug } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!name || !slug || !files.logo || !files.image) {
      deleteFiles(files); // Delete files if validation fails

      res
        .status(400)
        .json({ message: "Missing required field name or slug or files" });
    }

    // check if category already exists
    const existingCategoryByName = await categoriesRepository.findOne({
      where: [{ name }],
    });

    if (existingCategoryByName) {
      deleteFiles(files); // Delete files if category exists

      res.status(400).json({ message: "Category name already exists" });
      return;
    }

    const existingCategoryBySlug = await categoriesRepository.findOne({
      where: [{ slug }],
    });

    if (existingCategoryBySlug) {
      deleteFiles(files); // Delete files if category exists

      res.status(400).json({ message: "Category slug already exists" });
      return;
    }

    // upload image to cloudinary
    const logoUploaded = await uploadImage(files.logo[0].path, "icons");
    const imageUploaded = await uploadImage(files.image[0].path, "categories");

    // remove local file
    deleteFiles(files);

    const newCategory = categoriesRepository.create({
      name,
      slug,
      logoURL: logoUploaded.secure_url,
      imageURL: imageUploaded.secure_url,
    });

    await categoriesRepository.save(newCategory);

    res.json(newCategory);
  } catch (err: any) {
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      deleteFiles(files); // Ensure files are deleted on error
    }

    res.status(400).json({ message: err.message });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    let files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const category = await categoriesRepository.findOne({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    if (name && name !== category.name) {
      const existingCategoryByName = await categoriesRepository.findOne({
        where: [{ name }],
      });

      if (existingCategoryByName) {
        res.status(400).json({ message: "Category name already exists" });
        return;
      }
      category.name = name;
    }

    if (slug && slug !== category.slug) {
      const existingCategoryBySlug = await categoriesRepository.findOne({
        where: [{ slug }],
      });

      if (existingCategoryBySlug) {
        res.status(400).json({ message: "Category slug already exists" });
        return;
      }

      category.slug = slug;
    }

    if (files?.logo) {
      // upload image to cloudinary
      const icon = await uploadImage(files.logo[0].path, "icons");

      // remove local file
      fs.unlinkSync(files.logo[0].path);

      category.logoURL = icon.secure_url;
    }

    if (files?.image) {
      // upload image to cloudinary
      const image = await uploadImage(files.image[0].path, "categories");

      // remove local file
      fs.unlinkSync(files.image[0].path);

      category.imageURL = image.secure_url;
    }

    await categoriesRepository.save(category);

    res.json(category);
  } catch (err: any) {
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      deleteFiles(files); // Ensure files are deleted on error
    }

    res.status(400).json({ message: err.message });
  }
};

export const removeCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await categoriesRepository.findOne({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    category.isRemoved = req.body.isRemoved;
    await categoriesRepository.save(category);

    res.json({ message: "Category removed" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
