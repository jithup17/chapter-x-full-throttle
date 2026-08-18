# Chapter X // Full Throttle — Complete GitHub Pages Build

This zip is a complete deployable site.

## Navigation
1. GRID CALL
2. INVITE
3. RACE CONTROL
4. THE GRID

## Race Control tab
Race Control contains BOTH:
- Race Control Letter
- Personalized Driver Pass / Ticket

The pass changes automatically from the personalized URL.

## Personalized links

Replace `YOUR-USERNAME` if needed:

- Rohit: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/?driver=rohit`
- Siva Ram: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/?driver=siva`
- Shashank: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/?driver=shashank`
- Vijay: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/?driver=vijay`
- Omkar: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/?driver=omkar`
- Likith: `https://YOUR-USERNAME.github.io/chapter-x-full-throttle/?driver=likith`

For the repo shown earlier, the live links use:
`https://jithup17.github.io/chapter-x-full-throttle/?driver=...`

## The Grid
The six portraits in `assets/drivers/` were extracted directly from:
`Chapter_X_Full_Throttle_GRID_FIXED_FINAL(1).mp4`

Desktop:
- Hover card -> rival profile

Phone/tablet:
- Tap card -> rival profile

Each profile includes:
- Threat Level
- Race Control note
- Paddock Note
- Paddock Status
- Driver-cleared strip

The currently invited driver gets a subtle `YOUR GARAGE` marker.

## Upload to GitHub

Unzip this folder.

Upload the CONTENTS of the folder to the root of:
`chapter-x-full-throttle`

Your repo root should look like:

```
index.html
styles.css
app.js
.nojekyll
assets/
  invite-poster.png
  race-control-letter.png
  drivers/
  tickets/
```

Then commit. GitHub Pages should deploy automatically if Pages is already configured from the main branch/root.

## Asset cache
This build references CSS/JS/artwork with `?v=4` so browsers do not keep showing stale versions after you replace files.


## v5 change
The Grid now excludes the visitor themselves.

Examples:
- Rohit sees Siva Ram, Shashank, Vijay, Omkar, and Likith.
- Siva Ram sees Rohit, Shashank, Vijay, Omkar, and Likith.
- Every personalized link shows exactly 5 rivals.

Grid wording is now:
- `SCOUTING REPORT // 5 RIVALS CONFIRMED`
- `MEET THE COMPETITION`

The old `YOUR GARAGE` badge is no longer rendered because the visitor's own card is not shown in the competition section.


## v6 premium polish
- Race Control document area now fits inside the viewport on desktop so the bottom buttons remain visible above the fixed navigation.
- Letter and ticket artwork are vertically and horizontally centered.
- `GRID CALL` has a restrained yellow live-signal pulse.
- Yellow transmission dots pulse.
- `DRIVER VERIFIED` now loops through a green-circle + animated check verification sequence.
- Active yellow buttons/navigation receive a subtle periodic light sweep.
- Section numbers get a very soft yellow glow.
- Motion respects `prefers-reduced-motion`.


## v7 changes
- The Race Control letter/pass artwork is forced to `object-fit: contain` in both dimensions so the full document stays centered instead of appearing zoomed/cropped.
- The inactive `DRIVER PASS` tab now has a premium attention state:
  - restrained gold border pulse
  - subtle light sweep
  - pulsing gold signal dot
  - `PERSONALIZED` micro-badge
- Once the guest opens Driver Pass, the attention animation stops and the badge changes to `VIEWED`.
- The existing green DRIVER VERIFIED animation is unchanged.
