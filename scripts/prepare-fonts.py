"""Convert retained upstream TTF sources to WOFF2; retain all license metadata.

Requires fonttools[woff]. Lilita has a Reserved Font Name, so the converted
derivative uses Crown Latin Display in its internal naming records.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset

root = Path(__file__).resolve().parents[1] / 'src' / 'fonts'
for original, output, family in [
    ('ZCOOLKuaiLe-Regular.ttf', 'zcool-kuaile.woff2', None),
    ('LilitaOne-Regular.ttf', 'crown-latin-display.woff2', 'Crown Latin Display'),
]:
    font = TTFont(root / original)
    if family:
        labels = {1: family, 2: 'Regular', 3: family + ' Regular 1.0',
                  4: family + ' Regular', 6: 'CrownLatinDisplay-Regular',
                  16: family, 17: 'Regular'}
        for record in font['name'].names:
            if record.nameID in labels:
                record.string = labels[record.nameID].encode(record.getEncoding(), errors='replace')
    font.flavor = 'woff2'
    font.save(root / output)

# Retain common simplified Chinese plus punctuation and all current UI text.
# Rename the modified subset; keep upstream copyright and OFL name records.
rounded = TTFont(root / 'ResourceHanRoundedCN-Heavy.ttf')
codepoints = set(range(0x20, 0x250)) | set(range(0x2000, 0x2070)) | set(range(0x3000, 0x3040)) | set(range(0xFF00, 0xFFEF))
for lead in range(0xA1, 0xF8):
    for trail in range(0xA1, 0xFF):
        try:
            codepoints.add(ord(bytes([lead, trail]).decode('gb2312')))
        except (UnicodeDecodeError, TypeError):
            pass
for folder in ['src', 'demo']:
    for path in (root.parents[1] / folder).rglob('*.tsx'):
        codepoints.update(map(ord, path.read_text(encoding='utf-8-sig')))
options = subset.Options()
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=codepoints)
subsetter.subset(rounded)
labels = {1:'Crown Rounded SC',2:'Heavy',3:'Crown Rounded SC Heavy 0.1',4:'Crown Rounded SC Heavy',6:'CrownRoundedSC-Heavy',16:'Crown Rounded SC',17:'Heavy'}
for record in rounded['name'].names:
    if record.nameID in labels:
        record.string = labels[record.nameID].encode(record.getEncoding(), errors='replace')
rounded.flavor='woff2'
rounded.save(root / 'crown-rounded-sc.woff2')
