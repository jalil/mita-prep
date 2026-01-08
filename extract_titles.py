
import re

def extract_titles(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Find all weeks
    # Pattern: if (weekNum === X) { ... return { ... title: "Module Title", ... passages: [ ... ] ... }
    
    # We can regex for module blocks? 
    # Or just iterate line by line to be safer with indentation.
    
    lines = content.split('\n')
    
    weeks = []
    current_week = None
    
    for line in lines:
        line = line.strip()
        
        # Detect Week Start via comment or if block?
        # Comments like: // Week 1: ...
        if line.startswith("// Week"):
            # New week context
            pass
            
        # Detect Module Title
        # usually: title: "Utilization & AI Ethics", (at module level)
        # We need to distinguish module title from passage title.
        
        # Regex for Module Title:  title: "...", inside the return object but NOT inside passages array.
        # This is hard line-by-line.
        
        pass

    # Better approach: Regex over the whole string.
    # Find all module blocks.
    
    # module_pattern = r'if \(weekNum === (\d+)\) \{.*?return \{(.*?)\};'
    # This is hard because of nested braces.
    
    # Let's simple grep-like approach but smarter.
    # The file structure is very regular.
    # Module title is indented by 6 spaces?
    # Passage title is indented by 10+ spaces?
    
    # Let's assume the indentation from the file view I saw.
    # 51:       title: "Utilization & AI Ethics", (6 spaces)
    # 57:             title: "The Trolley Problem...", (12 spaces)
    
    results = []
    
    with open(filename, 'r') as f:
        for line in f:
            if 'title: "' in line:
                # Calculate indentation
                indent = len(line) - len(line.lstrip())
                match = re.search(r'title: "(.*?)"', line)
                if match:
                    title = match.group(1)
                    if indent < 10: # Module Title
                        results.append(f"\n### {title}")
                    else: # Passage Title
                        results.append(f"- {title}")
                        
    print("\n".join(results))

if __name__ == "__main__":
    extract_titles("lib/data.ts")
