import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";

const ResourcesHub = lazy(() => import("@/pages/ResourcesHub"));
const ContentPage = lazy(() => import("@/pages/ContentPage"));

const queryClient = new QueryClient();

function LazyFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0d10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8892a0",
        fontFamily: "'Roboto Mono', monospace",
        fontSize: "0.85rem",
        letterSpacing: "0.1em",
      }}
    >
      LOADING...
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LazyFallback />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/resources" component={ResourcesHub} />
        <Route path="/resources/:slug" component={ContentPage} />
        <Route path="/overview">{() => <Redirect to="/" />}</Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
