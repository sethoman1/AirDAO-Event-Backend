const createSlugname = (text: string) => {
  return `airdao-${text}`.toLowerCase() // Convert the string to lowercase
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (alphanumeric, underscore, dash)
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/--+/g, '-') // Replace multiple dashes with a single dash
    .trim();
}

export default createSlugname