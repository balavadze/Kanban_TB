import { React, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/LoginForm/SignupForm';
import AuthContext from './store/AuthorizationContextProvider';
import InputTodo from './components/InputTodo';
import './App.css';
import Dashboard from './components/Dashboard';
const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Routes>
        {/* {isLoggedIn ? (
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Container />
                <Footer />
              </>
            }
          />
        ) : (
          <Route
            path="/dashboard"
            element={
              <Navigate
                to="/login
          "
                replace
              />
            }
          />
        )} */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {!isLoggedIn && <Route path="/dashboard" element={<LoginForm />} />}
        {!isLoggedIn && <Route path="/signup" element={<SignupForm />} />}
        {isLoggedIn && (
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Dashboard />
                <Footer />
              </>
            }
          />
        )}
        <Route
          path="/new"
          element={
            <>
              <Header />
              <div className="InputTodo">
                <InputTodo />
                {/* <TaskCreator /> */}
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
