# Chapter X — GitHub Pages deployment

This is a static HTML/CSS/JavaScript site. No build step is required.

## Publish
1. Create a new GitHub repository, for example `chapter-x-full-throttle`.
2. Upload **the contents of this folder** to the repository root (not the folder itself).
3. Commit to `main`.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then Save.
7. GitHub will display the public Pages URL after deployment.

## Personalized links
If the Pages URL is:
`https://YOUR-USERNAME.github.io/chapter-x-full-throttle/`

Email these:
- Rohit: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/rohit/`
- Siva Ram: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/siva/`
- Shashank: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/shashank/`
- Vijay: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/vijay/`
- Omkar: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/omkar/`
- Likith: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/likith/`

## Replacing PNGs
The HTML never redraws your poster, letter, or tickets. It loads the raw PNG files in `assets/`.
Keep the filenames unchanged and replace the PNG whenever you revise artwork:
- `assets/invite-poster.png`
- `assets/race-control-letter.png`
- `assets/tickets/rohit.png`
- `assets/tickets/siva.png`
- `assets/tickets/shashank.png`
- `assets/tickets/vijay.png`
- `assets/tickets/omkar.png`
- `assets/tickets/likith.png`

## Privacy note
`noindex,nofollow` is included to discourage search-engine indexing, but GitHub Pages is still a public web URL. Do not treat the personalized URL as secret authentication.
