import Product from './components/Product';
function App() {

  return (
   <>
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Product/>
        </div>
      </div>
   </>
  )
}

export default App
