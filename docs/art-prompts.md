# 3D 卡通 UI 插图提示词

新增的星级资产与配套空底如下，均使用内置 image_gen，透明背景。

## 黄色星星与空星底座

黄色星星使用城堡作为风格参考，最终提示词：

```text
Use case: stylized-concept. Asset type: production game UI victory rating star. Create one original symmetrical five-point GOLDEN STAR, a chunky puffy dimensional 3D cartoon gold reward emblem. Match the reference illustration's rich warm sculpted gold and premium European cartoon mobile game materials. Front-facing orthographic camera, NO perspective tilt and NO rotation, one point straight up, equal balanced arms, thick rounded bevels, broad smooth bright yellow-gold front face, subtle lighter beveled rim, deeper amber gold side wall visible mainly at bottom, warm upper-left highlight, soft compact shadow directly below. The silhouette must read as a bold simple five-point star at 60px. Isolated exactly centered in square canvas, star spans about 76% width and height, generous transparent padding all around. No rays, no particles, no surroundings, no face, no eyes, no crown, no letters, no text, no watermark. Genuine transparent background.
```

空星槽以该黄色星星作为编辑目标，最终提示词：

```text
Use case: precise-object-edit. Edit this exact gold star into its matching EMPTY RATING SOCKET underlay for a game results screen. Preserve the exact centered position, front-facing view, five-point silhouette and proportions, rounded points, canvas size and transparent padding. Replace all yellow/gold material with cool dark desaturated navy-blue steel and soft slate gray. The front face becomes an EMPTY RECESSED star-shaped cavity, darker than the raised beveled rim, with subtle ambient occlusion inside, and a thick rounded pale slate metal outline around the cavity. No golden star remains. It must look like an empty five-point badge socket waiting for the original gold star to be slammed into it. Retain original dimensional thickness and compact shadow below. Premium cartoon 3D game material, slightly understated and darker so a bright gold star overlaid later will stand out. No rays, no particles, no text, no face, no watermark, no background. Genuine transparency.
```

工具：内置 `image_gen`，全部请求 `transparent_background: true`。关闭宝箱与战斗 / 资源插图使用 `public/art/royal-castle.png` 作为风格参考。开启状态使用对应关闭宝箱作为编辑目标。最终选择和文件映射见 `art-manifest.json`。

## 关闭宝箱

每个品质各调用一次，将下列品质描述插入 `{details}`：

```text
Use case: stylized-concept. Asset type: production mobile-game UI inventory illustration, transparent-background cutout. The attached image is a STYLE AND MATERIAL reference only. Create one original {details} Match reference's premium European cartoon stylized 3D rendering, thick soft beveled edges, playful strong silhouette, tactile hand-painted materials, realistic soft ambient occlusion, golden directional highlights, smooth broad surfaces, juicy saturated colors and dimensional depth. Chest centered, camera front-right three-quarter view with slightly elevated viewpoint, entirely visible with generous clean transparent padding, approximately square canvas. The chest fills 75 percent of the canvas. A subtle compact soft contact shadow directly beneath, still on transparency. Readable at 100px icon size. No environment, no floor plane, no text, no letters, no watermark, no official game logo, no copied brand design. Single isolated chest only.
```

| 品质      | details                                                                                                                                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| common    | COMMON chest: warm chunky honey-brown oak planks, thick matte iron-gray bands and large rounded iron rivets, simple square silver lock, modest sturdy silhouette, no gemstones.                                                               |
| rare      | RARE chest: saturated royal blue painted wooden barrel lid, substantial polished golden metal bands and feet, gold crown-shaped central clasp, beveled toy-like proportions, luxurious but simple.                                            |
| epic      | EPIC chest: rich amethyst purple wood and enamel, thick antique gold edging with beautiful rounded bevels, one large faceted violet gem in the central gold clasp, sculpted corner caps, a few tiny gold sparkle points.                      |
| legendary | LEGENDARY chest: majestic ivory-white enamel panels, royal blue accents, very thick sculpted burnished gold frame and feet, raised gold crown crest and luminous blue central gem, premium chunky silhouette, high quality crafted materials. |

## 对应开启状态

四种品质各以自己的关闭图调用一次，统一提示词：

```text
Use case: precise-object-edit. Create the OPEN STATE of this exact game UI treasure chest. Keep its material colors, all metal frame designs, front clasp, crown or gem decoration, feet, proportions, view direction, lighting direction, and premium stylized 3D European cartoon art unchanged. Only lift and hinge the existing lid backward about 60 degrees so the interior is clearly visible; original chest body remains in exactly the same shape. Place a modest heap of chunky gold coins inside, warm golden interior light and three tiny magical glints. Preserve any existing crown on the lid and front gemstone exactly, do not redesign the chest. Full isolated chest, completely visible, centered in a square canvas with generous transparent padding, subtle soft compact contact shadow. Genuine transparent background. No background environment, no floor plane, no text, no watermark, no official game assets.
```

## 角色、法术和资源

每项各调用一次，将对象描述插入 `{details}`：

```text
Use case: stylized-concept. Asset type: production game UI illustration cutout. The attached environment is a STYLE, LIGHTING, AND MATERIAL reference only. Create one original {details} Match a premium European cartoon 3D mobile-game visual: exaggerated pleasing proportions, very thick rounded bevels, tactile painted surfaces, soft ambient occlusion, golden highlights from upper left, saturated yet harmonious royal colors, dimensional high quality rendering. Isolated centered square composition, subject fills 80 percent, entirely visible, transparent padding, subtle soft compact contact shadow. Readable at card or icon size. Genuine transparent background, no landscape, no floor plane, no text, no letters, no border or card frame, no watermark, no official game characters or logos.
```

| ID       | details                                                                                                                                                                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| knight   | A friendly brave young royal knight bust, original character with chestnut wavy hair, broad warm smile, oversized rounded silver armor with royal blue cloth and golden rivets, simple open-faced helmet, a broad short sword held upright. Framed waist-up, attractive clearly readable face, full head visible. |
| ranger   | A friendly forest ranger bust, original character with warm brown skin, short curly dark hair, leaf-green hooded cape and moss green padded tunic, simple curved wooden bow and small arrow quiver, kind confident smile, no pointy ears. Framed waist-up with entire hood and bow visible.                       |
| fireball | A single compact sculpted magical fireball spell icon, bright luminous golden core encased in thick orange and coral-red curling flame tongues, soft stylized 3D fire with chunky rounded silhouette and dramatic warm glow, a short elegant curved flame trail. No character.                                    |
| guardian | A single substantial royal blue kite-shaped shield icon, thick sculpted polished gold rim, ivory-white face panels, raised golden four-pointed star at center, small symmetrical green laurel accents, magical soft cyan healing glints. Attractive thick 3D side walls and tactile materials. No character.      |
| coin     | A single thick gold reward coin, slightly tilted front three-quarter view so its substantial thickness is visible, embossed simple golden crown at center, generous beveled rim, gleaming warm highlights and subtle hammered gold surface. Simple clear silhouette and compact cast shadow.                      |
| gem      | A single large precious purple amethyst reward gem, upright squat hexagonal faceted crystal, saturated bright violet with pink inner reflections and crisp lavender highlights, clean large facets, a few tiny light glints. Strong readable chunky shape and compact cast shadow.                                |
| elixir   | A single compact glossy magical elixir potion drop icon: round pear-shaped translucent glass teardrop bottle filled with bright magenta-purple liquid, chunky gold neck cap, luminous pink inner highlights, thick soft beveled glass, one tiny floating sparkle. Strong clear silhouette.                        |
