import './App.css';
import { HomePage  } from './component/Homepage';
import { SuperHeroesPage } from './component/superheroresfetch';
import { RQSuperHeroesPage } from './component/Superherores';
import Navbar from './component/navbar';
import { QueryClient , QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter ,   Routes, Route } from 'react-router-dom';
import SingleSuperhero  from './component/singleSuperhero';
import ParallelQuerypage from './component/ParallelQuerypage';
import DynamicQueries from './component/DynamicQueriers';
import DependentQuery from './component/DependentQuery';
const queryClient = new QueryClient();

function App() {
  return (
   <>
    <QueryClientProvider client={queryClient} > 
   

    <BrowserRouter>
   <Navbar/>
   <Routes > 
   <Route path = "/" element ={<HomePage/>} />
   <Route path = "/super-heroes" element ={<SuperHeroesPage/>} />
   <Route path = "/rq-super-heroes" element ={<RQSuperHeroesPage/>} />
   <Route path = "/rq-super-heroes/:id" element ={<SingleSuperhero/>} />
   <Route path = "/rq-parallel" element ={<ParallelQuerypage/>} />
   <Route path = "/rq-Dynamic" element ={<DynamicQueries/>} />
   <Route path = "/re-dependent" element = {<DependentQuery/>} /> 
   </Routes>
   </BrowserRouter>
    {/* this one for devtools to show you  */}
   <ReactQueryDevtools initialIsOpen={false} position='botton-right' />
   </QueryClientProvider>
  
   </>
  );
}

export default App;
