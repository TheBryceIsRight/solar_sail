import axios from "axios"

export default async (req, res) => {
  const url = `https://api.figma.com/v1/files/L3hGCyJ4xRCZQ9SK1f4MLD`;
  const xFigmaToken = '190114-46a6f35c-d869-4e2e-8663-5a33f8c38a96';

  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}
