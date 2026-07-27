# Codex implementation brief — yapiriproject.com

## Product direction
Build **Yapiri Project** as the central Kokborok language preservation and modernisation platform. The public experience is organised around three linked foundations: a full dictionary, a practical grammar, and a parallel sentence corpus. Learning and language tools sit on top of those foundations.

## Current prototype
This package contains a responsive, accessible, static front-end with seven pages and working prototype interactions. Preserve the visual system and information architecture while replacing sample data with verified project data.

## Technical priorities
1. Keep the initial HTML meaningful and usable without JavaScript. JavaScript should enhance, not generate, primary page content.
2. Create one shared data model for dictionary entries, grammar records, and corpus examples.
3. Add the official Yapiri font during deployment; do not remap the assigned PUA characters.
4. Implement Roman-to-Yapiri conversion as a tested parser with longest-token matching for digraphs, spelling rules, punctuation, and tone.
5. Add an editorial CMS with contributor, source, dialect, reviewer, status, and revision-history fields.
6. Expose clean JSON/API endpoints later for keyboard, search, teaching, and language-technology tools.
7. Maintain mobile usability, keyboard navigation, semantic headings, reduced-motion support, and strong colour contrast.

## Suggested data entities
- `DictionaryEntry`
- `Sense`
- `ExampleSentence`
- `RelatedWord`
- `GrammarTopic`
- `GrammarRule`
- `CorpusSentence`
- `Source`
- `Contributor`
- `ReviewRecord`
- `DialectOrVariety`
- `MediaAsset`

## Immediate implementation sequence
1. Integrate the official font and verified alphabet mappings.
2. Import the Kokborok spreadsheet resources into a normalised staging database.
3. Build dictionary browse, search, entry, and editorial screens.
4. Add grammar chapters with corpus-linked examples.
5. Add sentence translation and review workflow.
6. Connect learning lessons and tools to the same data rather than duplicating content.
7. Deploy staging, test on Android/mobile, then publish to `yapiriproject.com`.
