import requests
from bs4 import BeautifulSoup

# Define the URL and file names
url = 'https://wiki.projectdiablo2.com/wiki/All_Items'
html_file = 'items.html'
info_file = 'item_info.html'  # changed to item_info.html

# Get the HTML document from the URL
response = requests.get(url)
html_content = response.text

# Save the HTML document to a file with specified encoding
with open(html_file, 'w', encoding='utf-8') as file:
    file.write(html_content)

# Parse the HTML document and extract item names and info
soup = BeautifulSoup(html_content, 'html.parser')
items = soup.find_all(['span', 'span', 'span', 'div'], class_=['d2-gold', 'd2-white', 'd2-green', 'item-info-box'])  # changed class to 'd2-gold'

# Prepare the HTML document for item info
html = '<html><body><table><tr><th>Base</th><th>Item Name</th><th>Item Info</th></tr>'  # changed the order of columns

# Iterate over the items and add them to the HTML document
for i in range(0, len(items), 2):
    item_name = items[i].text
    item_info = items[i+1].text
    if item_info.startswith('\n'):  # check if the first character is a newline
        item_info = item_info[1:]  # delete the first character
    base = item_info.split('\n')[0]  # get the first line of item info
    html += f'<tr><td>{base}</td><td>{item_name}</td><td>{item_info}</td></tr>'  # added base to the table

html += '</table></body></html>'

# Save the item info to a file with specified encoding
with open(info_file, 'w', encoding='utf-8') as file:
    file.write(html)