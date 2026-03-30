# Logo Instructions

The partner logos section is set up with placeholder divs. To add actual logos:

1. **Logo Files**: Download or obtain logo files (SVG or PNG with transparent background) for:
   - Tesla
   - Skygauge Robotics
   - McMaster University
   - Delta Hacks
   - Verkoda
   - Veesion
   - Avigilon
   - Walmart

2. **Placement**: Replace the `.logo-placeholder` divs in `index.html` with `<img>` tags:
   ```html
   <div class="partner-logo" data-partner="tesla">
       <img src="path/to/tesla-logo.svg" alt="Tesla">
   </div>
   ```

3. **Styling**: The logos will automatically:
   - Start at 40% opacity (grayscale)
   - Scale to 80% opacity and full color on hover
   - Maintain the modern, mysterious aesthetic

4. **Logo Sources**:
   - Company websites (press/media kits)
   - Brand asset repositories
   - Official logo files

The current placeholder structure uses `data-partner` attributes to identify each logo location.




