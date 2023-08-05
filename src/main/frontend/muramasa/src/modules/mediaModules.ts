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
            api.reviews().add(res.data.id, {id: null, text: lz.compressToBase64(review), code: res.data.code, reviewedAt: ""})
            .then((review_res) => {
                popupMessage.success("Media saved successfully.");
                setReview(lz.decompressFromBase64(review_res.data.text));
                setMedia({...res.data, review: review_res.data});
            })
            .catch(() => popupMessage.error("Cannot save review."));
        }else{
            popupMessage.success("Media saved successfully.");
        }
    })
    .catch(() => popupMessage.error("Cannot save that media."));
}

export function updateMedia(data: MediaData, review: string, token: string): void {
    const api = muramasa_api.media.auth(token);
    api.update({id: data.id, code: data.code, score: data.score, imgUrl: data.imgUrl, status: data.status, count: data.count, length: data.length, favorited: data.favorited, name: data.name, type: data.type})
    .then(() => {
        if(data.review) {
            if(!checkReview(review)) {
                api.reviews().delete(data.review.id || 0)
                .then(() => popupMessage.success("Media updated."))
                .catch(() => popupMessage.error("Cannot delete review."));
            }else {
                api.reviews().update({id: data.review.id, reviewedAt: data.review.reviewedAt, code: data.review.code, text: lz.compressToBase64(review)})
                .then(() => popupMessage.success("Media updated."))
                .catch(() => popupMessage.error("Cannot update review."));
            }
        }else {
            if(checkReview(review)) {
                api.reviews().add(data.id || 0, {id: null, text: lz.compressToBase64(review), code: data.code, reviewedAt: ""})
                .then(() => popupMessage.success("Media updated."))
                .catch(() => popupMessage.error("Cannot update review."));
            }
        }
    })
    .catch(() => popupMessage.error("Cannot update media."));
}

export function favorite(data: MediaData, token: string): void {
    muramasa_api.media.auth(token).update({id: data.id, code: data.code, score: data.score, imgUrl: data.imgUrl, status: data.status, count: data.count, length: data.length, favorited: data.favorited, name: data.name, type: data.type})
    .then(() => popupMessage.success(data.favorited === 0 ? "Unfavorited media." : "Favorited media."))
    .catch((err) => popupMessage.error(err.response.data.message));
}

export function remove(data: MediaData, token: string): void {
    muramasa_api.media.auth(token).delete(data)
    .then(() => popupMessage.success("Removed media from your list."))
    .catch((err) => popupMessage.error(err.response.data.message));
}