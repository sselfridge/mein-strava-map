const express = require('express');
const app = express();
const path = require('path');
const decodePolyline = require('decode-google-map-polyline');
// uncomment the below for proxy challenge

const leaderList = [
  { name: 'Anna', id: 'a0' },
  { name: 'Ben', id: 'b0' },
  { name: 'Clara', id: 'c0' },
  { name: 'David', id: 'd0' },
];

app.get('/api/getPath', (req, res) => {
  let polyDroppedTwice = "qfqnEpvxqUu@d@G?OCGEWc@cD}GqB{Dy@kBsBiEm@iAgDeHa@w@KYmBkE{MoXoJwSY]g@i@a@s@IGSII?_@R_CbBgAz@mAv@c@`@_J|G_@LK?KGwCqGa@u@[MSBoClBwCxByAbAQFw@f@}IpGiAp@cAt@KBM?IEEKa@eA_@w@kBkESSKCE@qDdCo@f@c@b@Y^s@lAWl@e@~AQ|@Ix@G|@?xANrCELIHmBvA}@v@u@j@qGdEoBzAuChBqGrEiFnD_ClB}DpCKJi@^k@ZmA`A_BhAm@\\k@d@uA|@u@n@iA\\MLe@P]`@w@j@uBbBoDhCa@^O\\Aj@TdBXvAz@rBt@pArBfE`AlB?LKRs@d@URGJ{AnAORk@^uBhBqGbFuAnAe@ZWVo@^KLIGIF?BN@HCEE@GE??BAGAJKLwAbAgAx@CLe@\\OR]V}@z@uAbAe@h@q@d@YZSL[XOKIUIs@C_@MiA?KBITYxAeAbByALAJDFJh@pA^r@@NELIHcAp@{BlBu@t@?@SNg@h@_Ax@iA|@{@d@GNEFkCtBCD?LKLo@f@iBzAaAbAuB|AkAfASV]NDLNLFADEPa@HMFCXGn@g@j@i@lBaBJMFS`@[X[j@c@f@Wz@u@TKvAgArA{A^YhAeArAeBXYtAcAVMTOZ]pAkAb@g@rAeAxAuA|FwENI~@w@NIbA_A`As@JMLCHMZMFOTUN?JEVW`@UBM?KGGICIBk@j@uAhAIL}@x@_Ax@[PmBfBuC|BI@KGMc@Ug@Jb@XNPNE@CDIDGACKEBAICB@AE?DHRH?FEFmDlCs@r@g@`@CNGHqAlAYHKNWR_BdAa@ZEBGCMQSu@q@_Ee@uB_@gAe@_AuDaGw@wAwCyEaB}CiCaEkEqHeH_LwCkFoDaGk@kA}BqD]w@COaEoHqDaG}@cBsAiByBiDEMa@w@_@i@c@w@kBuCQ_@SWQMy@e@aAq@YW}@kAcBqCOMIAI@_@T{CxCw@r@YPkAFkAPg@Du@P{@`@_@Xc@f@W`@k@xAY`@SRcAn@_CjBuAz@WN{B|@gBz@qDnAqChAs@Pg@Du@AwDF_AF_BPq@RwEjCS@IIcDmKoBkFwAaDiA_CsCuF_BkCs@sAg@s@GQk@q@k@{@}@mAcAmAqBoCmC_DmBkBsHcIq@iAa@w@uAsEQoBGqBRqH?wCIsAOoB[uCe@uCkAwFg@oBg@aCYeA_@qAyAeEgBwD{AyCgByC}AuC[q@G]BqI?[D_@CeE?oFC{C?sDBa@AuA@qCAkEEk@Gm@[}@a@u@q@eAe@eASs@UmB]wAY}@aBqE_@_AmDgGeCeE@Cy@sAUm@Ou@MkASyAq@yFGo@G[MWOk@YkBU}@o@mAuAiB[y@{@_Dw@}Be@}@mC}D[o@Ka@Ce@Ag@@{F?sCCiA@cEEiHEkB@eAE}C@wKC{AEOGKKIKEw@CqAAi@BeHBqAOkCDWBkAXsB\\iAZa@Dw@NyDRgBDs@FmANq@L_BLYFIFc@f@e@|@[hAMVQT_@^yAdBi@\\c@Ne@A_Eu@G@_@Io@IyA?gAYk@Mm@BqATwBPy@I[KEEc@IQAmABuA_@{@G_@Di@Po@HUDMAGBcA^cAl@MAUHGHIBw@AKCUM[]?S^m@HGVCJ@XJHATE\\On@]NUDcADKHILEJ?JDj@f@ZDZCTOHKh@{AVMZGf@CHEHKBM?QAOGMGEKEM?[@c@TSTGLu@lBIHUJMAWM_@o@i@uASUKC[BMDSRGLI^A`AE`@MZIJMDY?[CMEWQa@i@SMWCc@DWGUUEMCMA]PcANgB^mAFc@Be@Cu@KUS]OMc@WIGMSEWCaACSGOUOe@IYCe@HIHIVCTDl@AVYrA?VDd@AXMb@ONIBSAQOIYAk@Gg@KY_@k@MYUw@IKUQ[G]AOBKFY`AKJMJm@PKLEf@Fh@FPJNh@b@JLFNBPN`CE`@K`@GLKJO?OEMKGSA_AEQKKMEQDW\\i@pAWjAIVg@Nk@DUDSJSNmBpCMTUp@MRSHi@J{@DS@SCMIKMc@}@u@aA_@cBi@iA]m@GWMQEAG?QHm@b@UHUBs@?[LOPKTeA|DMTSP[D[CmC_A_@EO@]NWXw@hAUb@IROn@Gp@@ZPnABv@QjEMv@i@xB}@tFIfA?~BCt@Kb@ILa@j@U^Gd@@d@PhADd@B`BFjAAd@CREPINOJm@BMBWRGLENInCM`@{AnAyBhCI\\?PNpANfBJXTPJBXBLERU^w@VYNIp@UlASRINOJQ`AgBNORMRETDh@TRFRARErAe@vAYl@ITAVBRNLTD\\HtBEZKVy@r@KRGVCt@Hp@Tf@NNPJTD|AJfANl@Tz@p@j@Vn@HfBETBRDPJZ\\NZXz@Vd@XTn@T`@DNChAi@`@IN?NHXVBPAT[|@I`AERi@fAMd@ARBR\\~@@N?PQj@g@z@M^Gd@GfDK\\e@v@k@xAGb@@PBPJNVTxAx@JLFN@P?RMb@e@dACT@XHTLRl@r@j@x@Rj@Hn@D~BFt@Nr@x@xBRp@DV@r@Ip@ITWd@QLa@NoAVuEnAKFGLCN?RBRVx@Jl@HzAAvAHd@d@rAPt@P\\VPx@RLDRXFb@CjBD^FNTTl@b@h@l@Vd@j@~ARZHJ\\L|@Jj@NZLLFHLFN?RUtA?b@L\\t@tAV|AN`@Zn@lAtBHb@Fd@Bd@BvACb@Sl@e@l@a@^WPy@Xq@H{@A_ABcAAi@BSFSJaAbAc@ZaAZSJUNe@h@cAhBUViAz@iB|BQ\\K`@i@dCQZUVo@h@UVa@|@SXWTYPo@RYBgA?WDSL{@r@cAj@WFY@w@EYBYLQT?f@F^d@~Aj@lDBb@C`@O^g@t@UVWPYJqAHi@?MBOH{@z@Wf@Mh@g@nEIhA?vALrED|CD`@F|CHr@R^n@j@NTNTFXBZAJWjACVBTJPJJNHTDl@ErA]N?VFTPZ`@PNXH`AJ`@Jd@N`@TZ`@HTDV?TKf@u@bC_@f@u@v@O`@EZ?\\H|ADb@@v@cAhFMR{@z@YZOZc@dAWh@KJu@j@gATMFYBCDe@Hi@NUNIRI`@AVJ|ALfA@d@Od@INw@h@ILGN?h@J|@DfAAt@Gx@IZg@lAg@nBk@nAWt@]l@IXAXLnA?r@It@s@|CATV`BAPINWPmA^MHO\\CPBp@Hn@L^j@`AD`@CPQZULGHQf@C^@b@Hv@Fd@d@pBTx@j@p@dAx@`@`@b@bAPl@Ll@Bp@?x@AZMv@IXgAnCgAhCu@pDEj@?j@FvATpB\\xAdAvDnArFj@rBTjA@f@a@|OI`AuCnLYd@_@\\gAf@QVIZA^@L^zATrD@d@Af@Ed@W|AMjAKlDW`Ae@v@{BrBGVEV@XXjDF\\LXRRl@`@PRNXf@~ANZvB|Cn@n@t@f@VVR\\P`@RjAFdACx@BbA@PP`A?n@Mf@Wj@[`@ENQn@Iz@s@vBIf@Ef@Pb@VPbAd@\\ZjAlBF\\@REr@U|B?XBVPd@`AtAFNLf@J~@Ld@TH\\XLn@?TCVs@lBY`BSp@c@x@u@nBEp@@lAH`ALl@NTf@~@t@t@tHzEnBhAjAx@j@n@\\h@Td@Tp@j@VRL`BlBjCdC~AtA`Al@dDfC~BvBNRHRDXCp@i@fBi@rAQn@ALIHB@C?BCBB@AFIJGVFbD`BtBjA`Ap@jDfCfFzEx@j@^N~@T`@D^?~@KlBc@^C\\AnGb@rJFnHTX?nDKfAKfA[bAm@j@c@bGuFtAkATOhAm@dBw@vCyAl@c@pA{Al@e@jGaDbA[fASjAEr@?dCXjB^pFrAdF~A~@V^Hb@B`@@dAE`@G~@W\\Ot@m@VYT]P_@XiAf@uDPiADuAN_AJ]P]RWh@g@VKXIp@KV?j@P|@`@hA\\bATdALt@FlADbCGhOiBbAEvOmA~Fa@jDYpDk@tEgA|@Yx@_@lBeA`C{AxB}AzAoAlBkBrDyDx@aBfA}Al@i@p@a@RAv@OvCs@d@Uf@YnEoDzBaBhBaBzHuGfBmAhEkDhIiG~@w@pAmAt@w@V_@h@a@hCiC|@u@nCoBlIyGvAcAlSuP~@k@bHcGbBoAvAwAf@c@bBsAdD_ChDsC`A_AlY_VrI}GlDkCL[XUpAaAhCuBrDaDtFgEp@o@tC{BpD{CtBkBdEmDpCyBpCcCxKyIdByA`Aq@^]fAu@ZQ\\M`@KlBW`@M^ShFaEnDiClDkCbBkAjA_ArGwE^Qr@U|Ds@PGrCoBJCLBDPCLHLHZLVLf@Lj@RnAJ^?J|@nBVz@ZjAx@lB~CdIN`@tAfDh@vAdC`GhAtCdArBf@rAV|@HFJDR@VUz@m@jCuBbAs@fB{ApImGd@a@r@y@\\k@Zm@Vq@Rs@VqAJw@NmCHw@Lu@Ru@Ro@f@cAl@{@`@a@t@o@pBqAxPcMv@c@fAe@|@u@tKeI|CwB`BuAb@]r@o@RY";
  var decodePath = decodePolyline(polyDroppedTwice);

  res.send(JSON.stringify(decodePath));
});

// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
console.log(`Listening on Port 3000`);
