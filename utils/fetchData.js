
export async function fetchData(url) {
    const rs= await fetch(url)
    const data = await rs.json()
  return data
}