import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Farms from './pages/Farms';
import CropRecommendation from './pages/CropRecommendation';
import Weather from './pages/Weather';
import Expenses from './pages/Expenses';
import MarketPrices from './pages/MarketPrices';
import Schemes from './pages/Schemes';
import Forum from './pages/Forum';
import ForumPostDetail from './pages/ForumPostDetail';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import Equipment from './pages/Equipment';
import SmartIrrigation from './pages/SmartIrrigation';
import CropCalendar from './pages/CropCalendar';
import ExpertConsultation from './pages/ExpertConsultation';
import AppointmentDetail from './pages/AppointmentDetail';
import StateAgricultureCalendar from './pages/StateAgricultureCalendar';
import DiseaseDetection from './pages/DiseaseDetection';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms"
            element={
              <ProtectedRoute farmerOnly>
                <Farms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-recommendation"
            element={
              <ProtectedRoute farmerOnly>
                <CropRecommendation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <Weather />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute farmerOnly>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market-prices"
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schemes"
            element={
              <ProtectedRoute>
                <Schemes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum/:id"
            element={
              <ProtectedRoute>
                <ForumPostDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fertilizer-recommendation"
            element={
              <ProtectedRoute farmerOnly>
                <FertilizerRecommendation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment"
            element={
              <ProtectedRoute farmerOnly>
                <Equipment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/smart-irrigation"
            element={
              <ProtectedRoute farmerOnly>
                <SmartIrrigation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-calendar"
            element={
              <ProtectedRoute farmerOnly>
                <CropCalendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expert-consultation"
            element={
              <ProtectedRoute>
                <ExpertConsultation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expert-consultation/:id"
            element={
              <ProtectedRoute>
                <AppointmentDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/state-agriculture-calendar"
            element={
              <ProtectedRoute>
                <StateAgricultureCalendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease-detection"
            element={
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
