import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import MapPage from "./pages/Map";
import AddProperty from "./pages/AddProperty";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Popular from "./pages/Popular";
import PopularToggle from "./components/PopularToggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/listings" component={Listings} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/map" component={MapPage} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/add-property" component={AddProperty} />
      <Route path="/sell" component={AddProperty} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/popular" component={Popular} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <AuthProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              {/* This wrapper will be blurred when the AuthModal is open */}
              <div id="main-app-content">
                <Router />
                <PopularToggle />
              </div>
              <AuthModal />
            </TooltipProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

