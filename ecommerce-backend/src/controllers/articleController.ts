import { Request, Response } from "express";
import * as fs from "fs";

import { articleRepository } from "../repositories/articleRepository";
import { uploadImage } from "../services/cloudinaryService";

export const getArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { isClient } = req as any;
    const { category } = req.query;

    const articlesQuery = articleRepository.createQueryBuilder("article");

    if (category) {
      articlesQuery.andWhere("article.category = :category", { category });
    }

    if (isClient) {
      articlesQuery.andWhere(
        "(article.isPublished = :isPublished AND article.isRemoved = :isRemoved)",
        {
          isPublished: true,
          isRemoved: false,
        }
      );
    }

    articlesQuery.select([
      "article.id",
      "article.title",
      "article.category",
      "article.thumbnail",
      "article.content",
      "article.slug",
      ...(isClient ? [] : ["article.isRemoved", "article.isPublished"]),
      "article.createdAt",
      "article.updatedAt",
    ]);

    const articles = await articlesQuery.getMany();

    res.json(articles);
  } catch (err) {
    console.error("Error getting articles:", err);
    res.status(500).json({ message: "Error getting articles" });
  }
};

export const getArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;
    const article = await articleRepository.findOne({
      where: { slug, isRemoved: false, isPublished: true },
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    res.json(article);
  } catch (err) {
    console.error("Error getting article:", err);
    res.status(500).json({ message: "Error getting article" });
  }
};

export const createArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      res.status(400).json({ message: "Missing required field file" });
      return;
    }

    const result = await uploadImage(file.path, "articles");

    fs.unlinkSync(file.path);

    const newArticle = articleRepository.create({
      ...req.body,
      isPublished:
        typeof req.body.isPublished === "string"
          ? req.body.isPublished === "true"
          : req.body.isPublished,
      thumbnail: result.secure_url,
    });

    await articleRepository.save(newArticle);

    res.json(newArticle);
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({ message: "Error creating article" });
  }
};

export const updateArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const article = await articleRepository.findOne({
      where: { id: Number(id) },
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    if (req.file) {
      const file = req.file as Express.Multer.File;
      const result = await uploadImage(file.path, "articles");
      fs.unlinkSync(file.path);

      article.thumbnail = result.secure_url;
    }

    const newArticle = articleRepository.merge(article, {
      ...req.body,
      isPublished:
        typeof req.body.isPublished === "string"
          ? req.body.isPublished === "true"
          : req.body.isPublished,
    });

    await articleRepository.save(newArticle);

    res.json(article);
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).json({ message: "Error updating article" });
  }
};

export const deleteArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const article = await articleRepository.findOne({
      where: { id: Number(id) },
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    article.isRemoved = req.body.isRemoved;
    await articleRepository.save(article);

    res.json({ message: "Article removed" });
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).json({ message: "Error deleting article" });
  }
};
