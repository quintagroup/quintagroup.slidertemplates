from logging import getLogger
from pprint import pformat
#from Products.CMFQuickInstallerTool.interfaces import INonInstallable
from Products.CMFQuickInstallerTool.interfaces import IQuickInstallerTool

from zope.component import getMultiAdapter, queryUtility
from zope.component.hooks import getSite
from zope.interface import implements
from Products.CMFCore.utils import getToolByName
from Products.CMFCore.interfaces import IPropertiesTool
from Products.PortalTransforms.Transform import make_config_persistent

log = getLogger('quintagroup.slidertemplates')

INSTALL_PRODUCTS = [
    'collective.portlet.ngcollection'
]


def initialsetup(context):
    if context.readDataFile('initialsetup.txt') is None:
        # Not your add-on
        return
    portal = context.getSite()
    quickinstaller = getattr(portal, 'portal_quickinstaller')
    log.info(quickinstaller.installProducts(products=INSTALL_PRODUCTS))
    log.info(quickinstaller.installProducts(products=['quintagroup.slidertemplates']))
