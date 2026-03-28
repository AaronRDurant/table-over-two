import Script from "next/script";

type PlausibleScriptProps = {
  scriptSrc: string;
};

export function PlausibleScript({ scriptSrc }: PlausibleScriptProps) {
  return (
    <Script id="plausible-loader" src={scriptSrc} strategy="afterInteractive" />
  );
}
