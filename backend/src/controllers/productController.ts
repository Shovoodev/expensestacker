import express from "express";
import {
  createProduct,
  getProducts,
  getProductByGroupId,
} from "./../db/product";
import { deleteProductById } from "./../db/product";

import { getGroupById } from "./../db/group";

export const registerProductOnGroup = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    if (!name || !quantity || !price) {
      return res.status(400);
    }
    const group = await getGroupById(id);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    const product = await createProduct({
      name,
      quantity,
      price,
      group_id : id
    });

    const data = { ...group, ...product };

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const products = await getProducts();
    return res.status(200).json(products).end();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const deleted = await deleteProductById(id);

    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const getGroupProducts = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { id } = req.params;
  console.log({ id });

  try {

    const products = await getProductByGroupId(id);
    return res.status(200).json(products).end();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
