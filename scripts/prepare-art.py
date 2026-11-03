"""Prepare web delivery copies; original generated PNGs remain untouched.

Only resolution and encoding change. Alpha, illustration content and palette
are preserved. No retouching, background synthesis or visual editing.
"""
from pathlib import Path
import json
from PIL import Image

root=Path(__file__).resolve().parents[1]
source=root/'public'/'art'/'originals'
target=root/'src'/'assets'
target.mkdir(parents=True,exist_ok=True)
records=[]
for path in sorted(source.glob('*.png')):
    if 'candidate' in path.stem:
        continue
    output=target/(path.stem+'.webp')
    if output.exists() and output.stat().st_mtime>=path.stat().st_mtime:
        image=Image.open(output).convert('RGBA')
    else:
        image=Image.open(path).convert('RGBA')
        image.thumbnail((512,512),Image.Resampling.LANCZOS)
        image.save(output,'WEBP',quality=92,method=6,exact=True)
    records.append({'id':path.stem,'source':str(path.relative_to(root)).replace('\\','/'),'delivery':str(output.relative_to(root)).replace('\\','/'),'width':image.width,'height':image.height,'alpha':image.getextrema()[3][0]<255,'bytes':output.stat().st_size})

definitions='''export type IllustrationName =
  | 'chest-common' | 'chest-rare' | 'chest-epic' | 'chest-legendary'
  | 'chest-common-open' | 'chest-rare-open' | 'chest-epic-open' | 'chest-legendary-open'
  | 'knight' | 'ranger' | 'fireball' | 'guardian' | 'coin' | 'gem' | 'elixir'
  | 'star-filled' | 'star-empty';
'''
imports='\n'.join(f"import art{i} from './assets/{r['id']}.webp';" for i,r in enumerate(records))
entries=',\n'.join(f"  '{r['id']}':art{i}" for i,r in enumerate(records))
(root/'src'/'art.ts').write_text('// Generated from retained original PNGs by scripts/prepare-art.py.\n'+imports+'\n'+definitions+'export const illustrations: Partial<Record<IllustrationName,string>> = {\n'+entries+'\n};\n',encoding='utf-8')
(root/'docs'/'art-manifest.json').write_text(json.dumps({'generatedWith':'built-in image_gen','reference':'public/art/royal-castle.png','deliveryPreparation':'Resize and encode only; originals retained unmodified.','assets':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Prepared {len(records)} transparent web illustrations: {sum(r["bytes"] for r in records):,} bytes.')
