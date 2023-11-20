import re
import os

def extract_text_between_capital_lines(input_file, output_folder):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    extracted_text = []
    output_counter = 1
    start_extraction = False

    for line in lines:
        if re.match(r'^\s{10,}[A-Z]{2,}', line):
            # If the line starts with at least 10 white spaces and at least two consecutive capital letters
            if start_extraction:
                output_file = os.path.join(output_folder, f'file{output_counter}.txt')
                output_counter += 1

                # Write the extracted text to the previous output file
                with open(output_file, 'w', encoding='utf-8') as output_file:
                    output_file.writelines(extracted_text)

                # Reset extracted text for the new file
                extracted_text = []

            start_extraction = True

        if start_extraction:
            # Append lines to the extracted text
            extracted_text.append(line)

    # Write the extracted text to the last output file
    output_file = os.path.join(output_folder, f'file{output_counter}.txt')
    with open(output_file, 'w', encoding='utf-8') as output_file:
        output_file.writelines(extracted_text)

if __name__ == "__main__":
    input_path = '/Users/krishnasuresh/Desktop/embeddedvector/ogvec.txt'
    output_folder = '/Users/krishnasuresh/Desktop/embeddedvector'

    extract_text_between_capital_lines(input_path, output_folder)
    print(f"Extraction complete. Extracted text saved to {output_folder}")
