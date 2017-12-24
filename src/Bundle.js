/* @flow */
import type Application from "solfegejs-application/src/Application"
import type {BundleInterface} from "solfegejs-application/src/BundleInterface"
import type {ContainerConfiguratorBundleInterface} from "solfegejs-dependency-injection/interface"
import type Container from "solfegejs-dependency-injection/src/ServiceContainer/Container"
import EventListenerCompilerPass from "./DependencyInjection/Compiler/EventListenerCompilerPass"

/**
 * Event dispatcher bundle
 */
export default class Bundle implements BundleInterface
{
    /**
     * Get bundle path
     *
     * @return  {String}        The bundle path
     */
    getPath():string
    {
        return __dirname;
    }

    /**
     * Configure service container
     *
     * @param   {Container}     container       Service container
     */
    configureContainer(container:any):void
    {
        // Add the compiler pass that handle event listener tag
        container.addCompilerPass(new EventListenerCompilerPass());
    }


}
