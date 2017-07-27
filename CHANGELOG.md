# CHANGELOG

This changelog references the relevant changes done between versions.

To get the diff for a specific change, go to https://github.com/LIN3S/CMSKernel/commit/XXX where XXX is the change hash 
To get the diff between two versions, go to https://github.com/LIN3S/CMSKernel/compare/v0.1.0...v0.2.0

* 0.2.0
    * Added set of a complete frontend components
        * Wysiwyg
        * Gallery
        * File
        * Datepicker
        * Slug
        * Search box
    * Added menu management frontend view with drag and drop and nested tree support
    * Added BenGorFileBridge
    * Added BenGorUserBridge
    * [BC Break] Upgraded Lin3sAdminBridge related code to v0.5.
    * [BC Break] Changed namespaces related with the Symfony code.
    * [BC Break] Removed all about template infrastructure logic.
    * [BC Break] Removed `TranslatableType`. Check the docs to see how to map to a form a domain with translations.
* 0.1.0
    * Initial release
