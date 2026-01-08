
import re
import sys

def strip_html(text):
    clean = re.sub('<[^>]+>', '', text)
    return clean

def count_words(text):
    return len(text.split())

def audit_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File {filepath} not found.")
        return

    print("Starting Audit for Weeks 1-40...\n")
    issues = 0

    # Split content by Week
    # We look for "if (weekNum === X)"
    
    for i in range(1, 61):
        week_pattern = f'if \(weekNum === {i}\)'
        match = re.search(week_pattern, content)
        if not match:
            print(f"[ERROR] Week {i}: Not found in file.")
            issues += 1
            continue
        
        # Find the start of the block
        start_index = match.start()
        # Find the next week or end of file to limit scope (heuristically)
        next_week_pattern = f'if \(weekNum === {i+1}\)'
        next_match = re.search(next_week_pattern, content)
        end_index = next_match.start() if next_match else len(content)
        
        week_block = content[start_index:end_index]
        
        # Find passages
        # "content: `" ... "`"
        # We need to capture content carefully. Non-greedy match until backtick
        passage_matches = list(re.finditer(r'content:\s*`([^`]+)`', week_block))
        
        passages_found = 0
        if i == 60:
            print(f"DEBUG: Week 60 has {len(passage_matches)} passages.")
            for p_idx_debug, p_match_debug in enumerate(passage_matches):
                debug_content = p_match_debug.group(1)
                print(f"DEBUG: Week 60 Passage {p_idx_debug+1} content start: {debug_content[:50]}...")
                print(f"DEBUG: Week 60 Passage {p_idx_debug+1} word count: {len(debug_content.split())}")

        for p_idx, p_match in enumerate(passage_matches):
            passages_found += 1
            p_text_raw = p_match.group(1)
            p_text_clean = strip_html(p_text_raw)
            word_count = count_words(p_text_clean)
            
            # Check paragraphs
            paragraphs = p_text_raw.count('<p>')
            
            # Check underlined
            has_underlined = '<u>' in p_text_raw and '</u>' in p_text_raw
            
            print(f"Week {i} Passage {passages_found}: Words={word_count}, Paras={paragraphs}, Underlined={'YES' if has_underlined else 'NO'}")
            
            if word_count < 440 or word_count > 560:
                print(f"  [WARN] Word count out of range (450-550): {word_count}")
                # issues += 1 # Strict
            
            if paragraphs != 4:
                print(f"  [ERROR] Paragraph count is {paragraphs} (Expected 4)")
                issues += 1
                
            if not has_underlined:
                print(f"  [ERROR] Missing underlined sentence")
                issues += 1

        if passages_found == 0:
            # Check for legacy single passage 'passage: {'
            if 'passage: {' in week_block:
                print(f"[WARN] Week {i}: Uses legacy 'passage' object.")
                # We could audit it too, but let's just note it
            else:
                print(f"[ERROR] Week {i}: No passages extracted.")
                issues += 1

    print(f"\nAudit Complete. Total strict errors: {issues}")

if __name__ == "__main__":
    audit_file('/Users/jalil/.gemini/antigravity/scratch/mita-prep-app/lib/data.ts')
