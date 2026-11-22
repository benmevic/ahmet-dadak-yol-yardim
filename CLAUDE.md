# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ahmet Dadak Yol Yardım: a frontend-focused website for a 7/24 tow truck / roadside assistance (oto çekici, yol yardım) business serving all of İzmir (based in Bornova & Kemalpaşa; area may change later at the owner's request), phone 0540 123 0335 (tel:+905401230335, also WhatsApp), Instagram @dadakyolyardim. The business was previously "Dadak Nakliyat" (moving/freight); the owner disliked that site. The new site is tow/roadside assistance only; nakliyat services are dropped and must not appear. Services (from the owner's flyer): arıza kurtarma, oto kurtarma, lastik desteği, yakıt desteği, akü takviyesi, and taking drunk drivers' cars home ("Alkollü araç kullanmayın, arayın"). Primary language of the site and of the user is Turkish.

- `eski-site/DadakNakliyat/`: the old static Bootstrap site, kept only as reference (run it via the `eski-site` entry in `.claude/launch.json`, port 8081). Do not build on it.
- `kaynak/gorseller/`: real photos of the tow truck (Fiat Ducato flatbed, plate 35 CDV 546), a yellow/black flyer, and the new logo (black background, red + silver/white, gold crown). These are source material; optimized copies go into the site's own asset folder.

Local search visibility is a top priority (people search "çekici" + district/city on their phones in an emergency), so SEO, structured data (LocalBusiness / AutomotiveBusiness / Service schema), and fast mobile performance are core requirements, not polish.

## Status

The repository has no application code yet. Stack, build, lint and test commands are not decided; update this file with them once the project is scaffolded.

## Skill workflow

The user wants these skills used for this project:

- **Process:** superpowers (brainstorming before design/build, writing-plans, test-driven-development, systematic-debugging)
- **Design:** impeccable, frontend-design, ui-ux-pro-max (project-local in `.claude/skills/ui-ux-pro-max`), emil-design-eng, apple-design, pick-ui-library, prototype
- **Animation:** animate, animation-performance, find-animation-opportunities, review-animations
- **Mobile & testing:** mobile-native, break-ui, qa-my-app
- **SEO (local search):** searchfit-seo — seo-audit, schema-markup, on-page-seo, content-strategy
- **Before finishing:** code-review, security-review

Plugins enabled for the project are pinned in `.claude/settings.json`.
