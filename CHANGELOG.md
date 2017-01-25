#CHANGELOG

This changelog references the relevant changes done in this project.

To get the diff for a specific change, go to https://github.com/LIN3S/CMSKernel/commit/XXX where XXX is the change hash 
To get the diff between two versions, go to https://github.com/LIN3S/CMSKernel/compare/v0.1.0...v0.2.0

* 0.2.0
    * Refactored `Translatable` and `Translation` in domain, now are implemented as interfaces. In case you were
    using those as abstract classes, now have been moved to infraestructure and therefore you need to change the namespace
    in your domain.
    * Refactored `TranslationCollection`, now includes all required logic to handle translation collections. Was extracted
    from old abstract `Translatable` class.
