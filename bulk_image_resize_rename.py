# Used to resize and rename all images in a folder from format from https://drive.google.com/drive/folders/1QlFDRjtwJvJXBED7JsLN7jnkxB6ySr3p
# To a format supported by the website
import os
import re
from PIL import Image

def resize_and_rename_png(folder_path):
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
        return
    
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(".png"):
            old_path = os.path.join(folder_path, filename)
            
            # Process the filename to remove everything after the first '-'
            new_name = re.split(r'\s*-\s*', filename, 1)[0] + ".png"
            new_path = os.path.join(folder_path, new_name)
            
            # Open and resize the image
            with Image.open(old_path) as img:
                img = img.resize((256, 256), Image.LANCZOS)
                img.save(new_path)
            
            # Remove the old file if renamed
            if old_path != new_path:
                os.remove(old_path)
                print(f"Renamed and resized: {filename} -> {new_name}")
            else:
                print(f"Resized: {filename}")

if __name__ == "__main__":
    folder = input("Enter the folder path containing PNG files: ").strip()
    resize_and_rename_png(folder)
