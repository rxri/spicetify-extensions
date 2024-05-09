// @ts-check

// NAME: formatColors
// AUTHOR: CharlieS1103
// DESCRIPTION: Copies colors in colors.ini format from the CSS (For developers)

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function formatColors() {
    const { Platform } = Spicetify;
    if (!(Platform)) {
        setTimeout(formatColors, 300)
        return
    }

    const buttontxt = "Format Colors"
    const BUTTON_ICON = `
  <?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 	 viewBox="0 0 512 512" style="height: 50%; width: 50%; fill: var(--spice-text);" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M493.268,0H18.732C8.387,0,0,8.387,0,18.732v474.537C0,503.613,8.387,512,18.732,512h307.572c0.004,0,0.009,0,0.013,0
				c4.757,0,9.671-1.906,13.248-5.487l166.948-166.949c3.413-3.41,5.487-8.208,5.487-13.245V18.732C512,8.387,503.613,0,493.268,0z
				 M345.052,448.046V345.051h102.994C418.242,374.855,374.855,418.242,345.052,448.046z M474.537,307.587H326.32
				c-10.345,0-18.732,8.387-18.732,18.732v148.218H37.463V37.463h437.073V307.587z"/>
			<path d="M118.026,157.043h275.949c10.345,0,18.732-8.387,18.732-18.732c0-10.345-8.387-18.732-18.732-18.732H118.026
				c-10.345,0-18.732,8.387-18.732,18.732C99.294,148.656,107.681,157.043,118.026,157.043z"/>
			<path d="M118.026,256.579h275.949c10.345,0,18.732-8.387,18.732-18.732c0-10.345-8.387-18.732-18.732-18.732H118.026
				c-10.345,0-18.732,8.387-18.732,18.732C99.294,248.193,107.681,256.579,118.026,256.579z"/>
		</g>
	</g>
</g>
</svg>
  `

 new Spicetify.Topbar.Button(
        "Format Colors",
        BUTTON_ICON,
        convertColorSheet,
        false
    );

 
})()


function convertColorSheet(){
    for (const sheet of document.styleSheets) {
        // TODO: Fix the wall of ignores
        // @ts-ignore
        if (sheet.href == "https://xpui.app.spotify.com/colors.css" || sheet.ownerNode.classList[1] == "marketplaceScheme") {
            let cssText = sheet.rules[0].cssText
            cssText = cssText.replaceAll(":root {", "");
            cssText = cssText.replaceAll("{", "");
            cssText = cssText.replaceAll(":", "         =")
            cssText = cssText.replaceAll("--spice-", "")
            cssText = cssText.replaceAll("#", "")
            cssText = cssText.replaceAll("}", "")
            cssText = cssText.replaceAll("!important", "")
            Spicetify.Platform.ClipboardAPI.copy(cssText)
            cssText = cssText.replaceAll(";", `\\n`)
            const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
            const reg = /rgb.*?\\n/gm;
            cssText = cssText.replace(reg, '') 
    
            const htmlElement = `<span  style="user-select: all;">${cssText.replace(regex, '<br>')}</span>`
            Spicetify.PopupModal.display({
                title: "Formatted Colors",
                content: htmlElement,
            });
            
            Spicetify.showNotification("Copied to clipboard")
            break;
        }
    }

}
