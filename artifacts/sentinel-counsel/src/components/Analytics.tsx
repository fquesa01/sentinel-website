import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GSC_ID = import.meta.env.VITE_GSC_VERIFICATION as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }, []);

  return (
    <>
      {GSC_ID && (
        <Helmet>
          <meta name="google-site-verification" content={GSC_ID} />
        </Helmet>
      )}
    </>
  );
}
