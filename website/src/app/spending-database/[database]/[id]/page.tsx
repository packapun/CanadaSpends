import { notFound } from 'next/navigation'

export default async ({params}: { params: { id: string, database: string } }) => {
  const { id, database } = await params

  const url = `https://api.canadasbuilding.com/canada-spends/${database}/${id}.json?_shape=array`

  const res = await fetch(url, {
    cache: 'no-store'
  })

  if (!res.ok) return notFound()

  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) return notFound()

  const award = data[0]

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{award.title}</h1>
      <table className="w-full border border-gray-300 text-sm">
        <tbody>
          {Object.entries(award).map(([key, value]) => (
            <tr key={key} className="even:bg-gray-50">
              <td className="border p-2 font-medium align-top whitespace-nowrap">{key}</td>
              <td className="border p-2">{value as any}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <a href={award.source_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          View original record site
        </a>
      </div>
    </main>
  )
}
