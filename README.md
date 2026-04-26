# Brighter Smiles Dental Services

## cPanel deployment

Build the static site:

```bash
npm run build
```

Upload the contents of `dist` to the Namecheap cPanel document root, usually `public_html` for the primary domain or the addon domain folder for an addon domain. Upload the files inside `dist`, not the `dist` folder itself.

This repo also prepares a deployable archive:

```bash
tar -a -cf brighter-smiles-cpanel.zip -C dist .
```

In cPanel File Manager, upload `brighter-smiles-cpanel.zip` into the document root, extract it there, and confirm `index.html`, `assets`, `images`, `favicon.ico`, and `.htaccess` sit directly inside that root folder.
