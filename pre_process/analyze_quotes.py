import json
import pandas as pd
import sys

def read_json_file(file_path):
    encodings = ['utf-8', 'utf-8-sig', 'latin-1', 'ascii']
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as file:
                return json.load(file)
        except UnicodeDecodeError:
            continue
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return None
    print(f"Unable to read the file with any of the attempted encodings: {encodings}")
    return None

def analyze_quotes(data):
    if data is None:
        return []
    
    book_stats = {}
    
    for quote in data:
        book_title = quote['bookTitle']
        rating = quote['rating']
        
        if book_title not in book_stats:
            book_stats[book_title] = {'total': 0, 'rating_3': 0}
        
        book_stats[book_title]['total'] += 1
        if rating == 3:
            book_stats[book_title]['rating_3'] += 1
    
    results = []
    for book, stats in book_stats.items():
        total = stats['total']
        rating_3 = stats['rating_3']
        proportion = (rating_3 / total) * 100
        
        results.append({
            'Book Title': book,
            'Total Quotes': total,
            'Quotes with Rating 3': rating_3,
            'Proportion of Rating 3': f'{proportion:.2f}%'
        })
    
    return results

def main():
    file_path = 'quote_ratings.json'
    quote_data = read_json_file(file_path)
    
    if quote_data is None:
        print(f"Failed to read or parse the file: {file_path}")
        sys.exit(1)

    analysis_results = analyze_quotes(quote_data)

    if not analysis_results:
        print("No data to analyze.")
        sys.exit(1)

    df = pd.DataFrame(analysis_results)
    print(df.to_string(index=False))

if __name__ == "__main__":
    main()