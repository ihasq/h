import { $ } from "./$.js"
import { Symbol_toPrimitive } from "./const.js";

let registeredEvent = "";

const
	handlerCache = {},
	bundled = $((callbacks, ref) => Object.keys(callbacks).forEach(event => ref.addEventListener(event, callbacks[event], { passive: true }))),
	targetMap = new WeakMap(),
	on = new Proxy({}, {
		get(_, eventName) {
			return eventName === Symbol_toPrimitive || eventName === "$"
			? bundled[Symbol_toPrimitive](0x0001)
			: (handlerCache[eventName] ||= $((callbackFn, ref) => {
				if(!(registeredEvent.includes(eventName))) {
					globalThis.addEventListener(eventName, e => targetMap.get(e.target)?.[eventName]?.forEach?.(x => x(e)), { passive: true })
					registeredEvent += eventName + "\0"
				}
				if(!targetMap.has(ref)) targetMap.set(ref, {});
				(targetMap.get(ref)[eventName] ||= []).push(callbackFn)
			}, undefined, { name: "on." + eventName }))[Symbol_toPrimitive](0x0001)
		}
	})
;

export { on }