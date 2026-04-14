import { assetUrl } from '../utils/asset-url.js';

const DARK_LOGO_SRC = assetUrl('images/logo/Brighter-Smiles-Dental-logo.png');
const LIGHT_LOGO_SRC = assetUrl('images/logo/Brighter-Smiles-logo-design(lightmode).png');

export function BrandLogo({ compact = false }) {
  const sizeClassName = compact ? 'brand-logo__image brand-logo__image--compact' : 'brand-logo__image';

  return (
    <div
      className={compact ? 'brand-logo brand-logo--compact' : 'brand-logo'}
      aria-label="Brighter Smiles Dental Services logo"
    >
      <img
        src={DARK_LOGO_SRC}
        alt="Brighter Smiles Dental Services"
        className={`${sizeClassName} brand-logo__image--dark`}
      />
      <img
        src={LIGHT_LOGO_SRC}
        alt="Brighter Smiles Dental Services"
        className={`${sizeClassName} brand-logo__image--light`}
      />
    </div>
  );
}
