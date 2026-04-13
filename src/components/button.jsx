export function Button({ children, variant = 'primary', className = '', href, ...props }) {
  const baseClassName = variant === 'ghost' ? 'ghost-button' : 'cta-button';
  const composedClassName = `${baseClassName}${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <a className={composedClassName} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={composedClassName} {...props}>
      {children}
    </button>
  );
}
