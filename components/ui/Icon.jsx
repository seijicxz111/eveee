export default function Icon({ name, className = '', style }) {
  return <i className={`${name} ${className}`} style={style} aria-hidden="true" />;
}