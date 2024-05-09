"use strict";
(async function adblockify() {
    // @ts-expect-error: Events are not defined in types
    await new Promise(res => Spicetify.Events.platformLoaded.on(res));
    // @ts-expect-error: expFeatureOverride is not defined in types
    const { CosmosAsync, Platform, expFeatureOverride } = Spicetify;
    const { AdManagers } = Platform;
    const { audio } = AdManagers;
    const { UserAPI } = Platform;
    const productState = UserAPI._product_state || UserAPI._product_state_service || Platform?.ProductStateAPI?.productStateApi;
    if (!CosmosAsync) {
        setTimeout(adblockify, 100);
        return;
    }
    const hideAdLikeElements = () => {
        const css = document.createElement("style");
        css.id = "adblockify-style";
        css.innerHTML = `.nHCJskDZVlmDhNNS9Ixv, .utUDWsORU96S7boXm2Aq, .cpBP3znf6dhHLA2dywjy, .G7JYBeU1c2QawLyFs5VK, .vYl1kgf1_R18FCmHgdw2, .vZkc6VwrFz0EjVBuHGmx, .iVAZDcTm1XGjxwKlQisz, ._I_1HMbDnNlNAaViEnbp, .xXj7eFQ8SoDKYXy6L3E1, .F68SsPm8lZFktQ1lWsQz, .MnW5SczTcbdFHxLZ_Z8j, .WiPggcPDzbwGxoxwLWFf, .ReyA3uE3K7oEz7PTTnAn, .x8e0kqJPS0bM4dVK7ESH, .gZ2Nla3mdRREDCwybK6X, .SChMe0Tert7lmc5jqH01, .AwF4EfqLOIJ2xO7CjHoX, .UlkNeRDFoia4UDWtrOr4, .k_RKSQxa2u5_6KmcOoSw, ._mWmycP_WIvMNQdKoAFb, .O3UuqEx6ibrxyOJIdpdg, .akCwgJVf4B4ep6KYwrk5, .bIA4qeTh_LSwQJuVxDzl, .ajr9pah2nj_5cXrAofU_, .gvn0k6QI7Yl_A0u46hKn, .obTnuSx7ZKIIY1_fwJhe, .IiLMLyxs074DwmEH4x5b, .RJjM91y1EBycwhT_wH59, .mxn5B5ceO2ksvMlI1bYz, .l8wtkGVi89_AsA3nXDSR, .Th1XPPdXMnxNCDrYsnwb, .SJMBltbXfqUiByDAkUN_, .Nayn_JfAUsSO0EFapLuY, .YqlFpeC9yMVhGmd84Gdo, .HksuyUyj1n3aTnB4nHLd, .DT8FJnRKoRVWo77CPQbQ, .main-leaderboardComponent-container, .sponsor-container, a.link-subtle.main-navBar-navBarLink.GKnnhbExo0U9l7Jz2rdc, button[title="Upgrade to Premium"], button[aria-label="Upgrade to Premium"], .main-topBar-UpgradeButton, .main-contextMenu-menuItem a[ehrf^="https://www.spotify.com/premium/"], div[data-testid*="hpto"] {display: none !important;}`;
        document.head.appendChild(css);
    };
    const disableAds = async () => {
        try {
            await productState.putOverridesValues({ pairs: { ads: "0", catalogue: "premium", product: "premium", type: "premium" } });
        }
        catch (error) {
            console.error("[Adblock] Failed inside `disableAds` function", error);
        }
    };
    const configureAdManagers = async () => {
        try {
            const { billboard, leaderboard, inStreamApi, sponsoredPlaylist } = AdManagers;
            audio.audioApi.cosmosConnector.increaseStreamTime(-100000000000);
            billboard.billboardApi.cosmosConnector.increaseStreamTime(-100000000000);
            await audio.disable();
            audio.isNewAdsNpvEnabled = false;
            await billboard.disable();
            await leaderboard.disableLeaderboard();
            await inStreamApi.disable();
            await sponsoredPlaylist.disable();
            if (AdManagers?.vto) {
                const { vto } = AdManagers;
                await vto.manager.disable();
                vto.isNewAdsNpvEnabled = false;
            }
            setTimeout(disableAds, 100);
        }
        catch (error) {
            console.error("[Adblock] Failed inside `configureAdManagers` function", error);
        }
    };
    const bindToSlots = async () => {
        const slots = await CosmosAsync.get("sp://ads/v1/slots");
        for (const slot of slots) {
            subToSlot(slot.slot_id);
            handleAdSlot({ adSlotEvent: { slotId: slot.slot_id } });
        }
    };
    const handleAdSlot = (data) => {
        const slotId = data?.adSlotEvent?.slotId;
        try {
            audio.inStreamApi.adsCoreConnector.clearSlot(slotId);
        }
        catch (error) {
            console.error("[Adblock] Failed inside `handleAdSlot` function. Retrying in 100ms...", error);
            setTimeout(handleAdSlot, 100, data);
        }
        configureAdManagers();
    };
    const subToSlot = (slot) => {
        try {
            audio.inStreamApi.adsCoreConnector.subscribeToSlot(slot, handleAdSlot);
        }
        catch (error) {
            console.error("[Adblock] Failed inside `subToSlot` function", error);
        }
    };
    const enableExperimentalFeatures = async () => {
        try {
            const expFeatures = JSON.parse(localStorage.getItem("spicetify-exp-features") || "{}");
            const hptoEsperanto = expFeatures.enableEsperantoMigration?.value;
            if (!hptoEsperanto)
                expFeatureOverride({ name: "enableEsperantoMigration", default: true });
        }
        catch (error) {
            console.error("[Adblock] Failed inside `enableExperimentalFeatures` function", error);
        }
    };
    enableExperimentalFeatures();
    bindToSlots();
    hideAdLikeElements();
    productState.subValues({ keys: ["ads", "catalogue", "product", "type"] }, configureAdManagers);
})();
