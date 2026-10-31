const paths = {
  arrowRight: 'M4 12h16m-6-6 6 6-6 6',
  arrowUpRight: 'M6 18 18 6M6 6h12v12',
  arrowLeft: 'M20 12H4m6-6-6 6 6 6',
  arrowDown: 'M12 4v16m-6-6 6 6 6-6',
  chevronDown: 'm6 9 6 6 6-6',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  moon: 'M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5 8.5 8.5 0 1 0 20.5 13.1Z',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  file: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Zm0 0v6h6M8 13h8M8 17h5',
  chart: 'M4 20h16M7 15v-4m5 4V5m5 10V8',
  target: 'M21 12a9 9 0 1 1-9-9m5 9a5 5 0 1 1-5-5m0 5 8-8m-4 0h4v4',
  lock: 'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5Zm7 5v2',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  eyeOff:
    'm3 3 18 18M10.6 5.1 12 5c6.4 0 10 7 10 7a19 19 0 0 1-3.1 3.9M6.2 6.2C3.5 8.5 2 12 2 12s3.6 7 10 7a12 12 0 0 0 5.2-1.2M10 10a3 3 0 0 0 4 4',
  leaf: 'M20 3C10 2 3 7 5 15c3 9 17 4 15-12ZM4 21 15 10',
  settings:
    'm9.5 3-.6 2.1-1.4.8-2.1-.5L3 9.6l1.5 1.6v1.6L3 14.4l2.4 4.2 2.1-.5 1.4.8.6 2.1h5l.6-2.1 1.4-.8 2.1.5 2.4-4.2-1.5-1.6v-1.6L21 9.6l-2.4-4.2-2.1.5-1.4-.8-.6-2.1Zm6 9a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0',
};

export default function Icon({ name = 'arrowUpRight', size = 20, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={paths[name] || paths.arrowUpRight} />
    </svg>
  );
}
