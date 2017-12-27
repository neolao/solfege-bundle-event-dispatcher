/**
 * Compiler pass for the service container
 * It handles tags to register event listeners
 */
export default class EventListenerrCompilerPass
{
    /**
     * Process the tags
     *
     * @param   {Container}     container   Service container
     */
    async process(container)
    {
        let definition = container.getDefinition("solfege_event_dispatcher");

        let serviceIds = container.findTaggedServiceIds("solfege.event_listener");
        for (let serviceId of serviceIds) {
            let reference = container.getReference(serviceId);
            let serviceDefinition = container.getDefinition(serviceId);
            let serviceTags = serviceDefinition.getTags();
            for (let tag of serviceTags) {
                if (!tag.name || tag.name != "solfege.event_listener") {
                    continue;
                }

                if (!tag.event) {
                    // @todo Warning: the tag needs an event name
                    continue;
                }

                if (!tag.method) {
                    // @todo Warning: the tag needs a method name
                    continue;
                }
                definition.addMethodCall("addListener", [
                    tag.event,
                    reference,
                    tag.method
                ]);
            }
        }
    }
}
