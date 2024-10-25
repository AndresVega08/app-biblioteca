import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ViewBook from './pages/ViewBook/ViewBook';
import AdminLayout from './pages/admin/Layout/AdminLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import { AsideProvider } from './context/AsideContext';
import Adduser from './pages/admin/adduser/Adduser';
import AddBook from './pages/admin/AddBook/AddBook';
import UpdateBook from './pages/admin/UpdateBook/UpdateBook';
import Book from './pages/admin/books/Book';
import Reservation from './pages/admin/reservations/Reservation';
import User from './pages/admin/users/User';
import Reports from './pages/admin/reportes/Reports';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import UpdateUser from './pages/admin/UpdateUser/UpdateUser';
import ProtectedRoute from './ProtectedRoute';






function App() {
  const { user } = useContext(AuthContext);

  return (
    <AsideProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          {/* user routes */}
          <Route index path="/" element={!user?.isAdmin ? <Home /> : <Navigate to={"/admin/dashboard"} />} />
          <Route path='/viewbook/:id' element={!user?.isAdmin ? <ViewBook /> : <Navigate to={"/admin/dashboard"} />} />



          <Route path='/admin' element={<ProtectedRoute isAdmin><AdminLayout /></ProtectedRoute> } >
            <Route path='dashboard' index element={<Dashboard />} />
            <Route path='books' index element={<Book />} />
            <Route path='reservations' index element={<Reservation />} />
            <Route path='users' index element={<User />} />
            <Route path='reports' index element={<Reports />}/>
          </Route>


          <Route path='/addbook' element={<AddBook />} />
          <Route path='/updatebook/:id' element={<UpdateBook/>} />
          <Route path='/adduser' element={<Adduser />} />
          <Route path='/updateduser/:id' element={<UpdateUser />} />

         
         

        </Routes>
      </BrowserRouter>
    </AsideProvider>
  );
}

export default App;

