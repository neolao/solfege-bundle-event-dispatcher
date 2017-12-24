/* @flow */
import {bind} from "decko"

/**
 * Dispatcher
 */
export default class Dispatcher
{
    /**
     * Listeners by event name
     */
    eventNameListeners:Map<string,Array<any>>;

    /**
     * Constructor
     */
    constructor()
    {
        this.eventNameListeners = new Map();
    }

    /**
     * Add a listener
     *
     * @param   {string}    eventName           Event name
     * @param   {any}       listenerInstance    Listener instance
     * @param   {string}    methodName          Method name
     */
    @bind
    addListener(eventName:string, listenerInstance:any, methodName:string):void
    {
        let listeners = [];
        if (this.eventNameListeners.has(eventName)) {
            listeners = this.eventNameListeners.get(eventName);
        } else {
            this.eventNameListeners.set(eventName, listeners);
        }
        if (!listeners) {
            listeners = [];
            this.eventNameListeners.set(eventName, listeners);
        }

        const listener = {
            instance: listenerInstance,
            methodName: methodName
        };
        listeners.push(listener);
    }

    /**
     * Dispatch an event
     *
     * @param   {string}    eventName   Event name
     * @param   {any}       event       Event instance
     */
    @bind
    async dispatch(eventName:string, event:any):void | Promise<void>
    {
        if (!this.eventNameListeners.has(eventName)) {
            return;
        }

        const listeners = this.eventNameListeners.get(eventName);
        if (!Array.isArray(listeners)) {
            return;
        }
        for (let listener of listeners) {
            let instance = listener.instance;
            let methodName = listener.methodName;

            if (typeof instance[methodName] === "function") {
                if (instance[methodName].constructor.name === "AsyncFunction") {
                    await instance[methodName].call(instance, event);
                } else {
                    instance[methodName].call(instance, event);
                }
            }
        }
    }
}
