import { RawDraftContentState } from "draft-js";
import { MediaData } from "./mediaData";
import muramasa_api from "../api/muramasa/routes";
import popupMessage from "./toaster";
import lz from "lz-string";

function checkReview(review: string): boolean {
    const editorStateObject: RawDraftContentState = JSON.parse(review);
    if(editorStateObject.blocks.length === 1) {
        return editorStateObject.blocks[0].text.length != 0;
    }
    return true;
}

export function saveMedia(data: MediaData, review: string, token: string, setMedia: Function, setReview: Function): void {
    const api = muramasa_api.media.auth(token);
    api.add(data)
    .then((res) => {
        setMedia(res.data);
        if(checkReview(review)) {
            api.reviews().add(res.data.id, {id: null, text: lz.compressToUTF16(review), score: res.data.score, code: res.data.code, reviewedAt: ""})
            .then((res) => {popupMessage.success("Media saved successfully.");setReview(lz.decompressFromUTF16(res.data.text))})
            .catch(() => popupMessage.error("Cannot save review."));
        }else{
            popupMessage.success("Media saved successfully.");
        }
    })
    .catch(() => popupMessage.error("Cannot save that media."));
}

export function updateMedia(data: MediaData, review: string, token: string): void {
    const api = muramasa_api.media.auth(token);
    
    api.update(data)
    .then(() => {
        if(checkReview(review) && data.review) {
            api.reviews().update({...data.review, text: lz.compressToUTF16(review)})
            .then(() => popupMessage.success("Media updated."))
            .catch(() => popupMessage.error("Cannot update review."));
        }else popupMessage.success("Media updated.");
    })
    .catch(() => popupMessage.error("Cannot update media."));
}

export function favorite(data: MediaData, token: string): void {
    muramasa_api.media.auth(token).update(data)
    .then(() => popupMessage.success(data.favorited === 0 ? "Unfavorited media." : "Favorited media."))
    .catch((err) => popupMessage.error(err.response.data.message));
}

export function remove(data: MediaData, token: string): void {
    muramasa_api.media.auth(token).delete(data)
    .then(() => popupMessage.success("Removed media from your list."))
    .catch((err) => popupMessage.error(err.response.data.message));
}