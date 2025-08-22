import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { THEME_CONFIG } from './constants/theme';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PrivateSession from './pages/PrivateSession';
import GroupClass from './pages/GroupClass';
import Workshop from './pages/Workshop';

// Create custom Mantine theme with our color scheme
const theme = createTheme(THEME_CONFIG);

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navigation />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/private-session" element={<PrivateSession />} />
              <Route path="/services/group-class" element={<GroupClass />} />
              <Route path="/services/workshop" element={<Workshop />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;