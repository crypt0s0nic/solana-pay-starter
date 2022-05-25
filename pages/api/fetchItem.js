import products from "./products.json";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { itemID } = req.body;
    if (!itemID) {
      res.status(400).send('Missing itemID');
    }

    for (let i = 0; i < products.length; i++) {
      let found = false;
      if (products[i].id === itemID) {
        const { hash, filename } = products[i];
        found = true;
        res.status(200).send({ hash, filename });
        break;
      }
      if (i === products.length - 1 && !found) {
        res.status(404).send("Item not found");
      }
    }
  } else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}

export default handler
