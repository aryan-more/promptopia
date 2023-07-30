import '@/styles/globals.css'

export const metadata = {
  title: "Promptopia",
  description: "Discover & share ai prompts"
}

const layout = (
  {
    children,
  }: {
    children: React.ReactNode
  }
) => {
  return (
    <html>
      <body>
        <div className='main'>
          <div className="gradient" />
        </div>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default layout