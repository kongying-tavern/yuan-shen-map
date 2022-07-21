//@ts-check
/**
 * @typedef {Array} user_fileNames 用户存档名的列表,喜欢啥填啥，如['uid1','小号','各种号']
 * @typedef {Array} user_fileContents 存档对应的标记值，如[['1_1','26_1'],['1_2','26_2'],['27_1','27_12','27_13']]
 * @typedef {Array} user_fileIds 暂时不知道这是啥
 */

/** @type {Array.<string>} */
var user_fileNames = []
/** @type {Array.<string>} */
var user_fileContents = []
/** @type {Array.<string>} */
var user_fileIds = []

/** @type {Array.<object>} */
var user_files = []

/** @type {string} 用户 token 参数*/
var tokenPara

/** @type {boolean} 首次检测同步确认*/
var confirmSync = true

/** @type {boolean} 同步检测*/
var isSync = false

/** @type {boolean} 同步检测*/
var isCopy = false

/** @type {boolean} 同步检测*/
var isFirstLogin = true

/** @type {boolean} 是否可开存档框*/
var canOpenSave = false

/*app客户端数组*/
var array_Client = [
  [
    '3ffe859147c8a1e0dd42d3ffb2fa4b24e9e2f92f07450931edbe17e88f7adce5',
    '529b2e91c921a24f44e0199a9beee7e4967df6933eadcd30274c8a762103905b',
  ],
  [
    '9b0a30db936b5955e86c57a9b3f0d3ceb30ecad3b5ae695878e1dcda41eb7d27',
    'b4c8f122ac1f1ea79ea4b4f54cb8534a1d0ea575612be49c40dd05ea33b38972',
  ],
  [
    '7cb3db1eaa7962a93b0b2a033f1f27a7e28211df7eb487991f1f1b645362bf80',
    '3dc0c790c80c40fc700d3bd5012dd67a0f53f74b8368ca82b748e6c2775d1e65',
  ],
  [
    '4a8595fec766c4229c464802be433cdb5b62d30c92187ffde9819649ed127573',
    'e04356469c96e40b284cf9cec4dd1f4113c926f900d0269b8a329bd1020f5472',
  ],
  [
    '62d814c349d83e19882d12dd74cd3d5dc64046a566ae5243ace78992cb57b1a8',
    '79d964f925102d44542481a9eb002a49b92d8cce142f825c049365cc3b62e099',
  ],
  [
    'c5406b11f6d4cbc4d8b1ee77727921601edea8f13086aa4cc0b188a18597af36',
    '5bf8074d4c53855d484126f02a020b0d05588dc6be9a0e45d22d11c060998d82',
  ],
  [
    'debac29d81445898233149cbc74511900ce443fc8199f21de1fbc93ee74f024d',
    '25314360438a06cb4fecf7e1d587c1575544302e829212b478554708ea7b054f',
  ],
  [
    '8d8f8ddf44cb7c26c2edf94ef49e61ba9fff81d61d1009102e1b80ffa73e0fe6',
    '2ee96cbf06f0c69572c397c8549ebba5a6c7f2d2a4984dc1c943d95f028dc1e2',
  ],
  [
    'dcd3cf0c1191e272517d2eb4db0ad76f844a248e2b43e4a8d720162b35fad717',
    '2aac05598b4d2453a6b4f8c19aadb6ed9913469b547689247cf5756bc2f30815',
  ],
  [
    'ab142a5b65c557a94efdff7aaefbb4091ea489735e40cea74d03105ea1ec99ff',
    '231d9899b17ce161d9807d7d6cbc377d1e44c48bf205523c506cfbdd47278cb5',
  ],
  [
    '1a4fe543d02cd264589e771f54cf253c4bee64488b365b9a13a5da1b3d9b3858',
    'ef5ceada657a1ef7afe93fe973349945c1516238fd93c4e8dc9db271aacad0f4',
  ],
  [
    '18134c01da02121138740f8d7bdfd27d496239d2f04363211705ba5cddd9aed5',
    'fac41ca2dca496a6ededa2cf5c91dc0b1f54f7dd3307335579e287ba32185c9c',
  ],
  [
    'fffe186d6e668ff283be662c919a4a2ba9f31b938e241f5f731094365f24754b',
    '885ae56a004f03e52971eca1c8a87c040ea188788ff2d15df31de6b8061de7e1',
  ],
  [
    'e1380c160a5a35a4dbc37705693cdf720d435f809997ab9295b5e1f1f5b75e48',
    '40003ddba264197c1b98b62441782ea55500b88135688d7601c65a475541c6d7',
  ],
  [
    'b757bcea5d608283314e0bb68a5c9194cfc0229131b2d8b8872d34b304d1c0d1',
    'eef6d9c6059cb301cf1188e61fc8145e7117ef78464ffeba5fa46340072cf58f',
  ],
  [
    'd673d92fa6ec34767ea65b3b974543a76f61361a668033dabe2d15f792582895',
    '0bc9b58f400e4ea6b44e4bf5ad2c539f58bf817e6f60f29df10c341be16e8b2f',
  ],
  [
    'f7c9aeb0ec85a313bdd6bd4ec6af69035093796c2d6bf551a69d4d80b0def63e',
    '267519e1ac1c4908c1f313ff30f1042c658f8a9065db31eafae5ed200f961e28',
  ],
  [
    'a6a36aa3f55a4312bd9820aefb22af8ca83a66bcc2dda0d1dce7a76f89fbeb85',
    'f0ffded7775809a1627a642bdb67d28aa99d6a03cbedba2d0ea0bade700ddaeb',
  ],
  [
    '150f4ab86de28d98679d5c2005c357a455423647b15b3fc664ab89a07b3b2927',
    'ee57f22571dd9a508cd5c107eedb0f41dd52b7cb52a34265779fe81c1373c482',
  ],
  [
    '29ebee527034eaba3aef872eaed53c250032965d24e5f7b86908e83fefb0bbaa',
    'fd0d722796794951d6d31b9a84e9ee6830ae230a9a8ae60e52dcd2d40bded770',
  ],
  [
    '04aa22384e59468ddbc19089337a70d8f23b90657ec9f6645473856ec81db8b9',
    '31e5e3923f1ee7015e4095c0d9198640fe4dae3365f622de6f478dd675f384d5',
  ],
  [
    'f4ceb969a713c5e70db1d8056a4a0ac2ac25e20f3c18a6dd4a977cd77f0b7a3d',
    '083f2f441435e445aea7ea9adebfd35d86264d0d4a8bd58dec80a055a824516e',
  ],
  [
    'ebab3bcb5b92394c37ce9eb1031947840a8752d89a781f266c703824014152c8',
    'a3317dd36bed2075983bb5fc5e8ffeeb576124357f0d738f2dd8d5bd5b75c153',
  ],
  [
    'c0360fc8c8ef1cf475b36fc1902d8fbb885c19691efb5c94e0973a26ce9ad439',
    'c136629fc87e96c86e29fbc783179017cded136ffc3d01c0bd18fb71a9f21f24',
  ],
  [
    '7a7901ac9869763af77843930130904bd88e9ef16a5b91fcc3e0734008ccacf0',
    '818e5b6e6700c7f34cce0e80897e6e15f7be9dc97bbd15701e6475504f083fc4',
  ],
  [
    'c33eba09e998d04a611032d3fdb1ccc498370d45cb067ee208fee3e0782d7e38',
    '54c6c241f331f75383bbe6f98c155f607cbedf09756f1bd54f6402e85989f069',
  ],
  [
    'ecf321d3fac2a65ab386f8019bac550ee9838eacf1e76c1e6eb441cdecfa77a5',
    'fa10ab71721e94709f4178f6378243aa833190135a8bbdaf561b9e42486da41a',
  ],
  [
    'cacf31235a12dc24bc1e3406da84e3a68e6ce2ed0e3c513bc6704a96b8cb7fe0',
    'de19f2c73a0d9bb69e3ec7b31ae8d81c906b31a510e38e09413fa31ed30c722e',
  ],
  [
    'ece831e2b3c8031a4eaffd237de219f316c3c24cfb49e2cc2bb1e57543971c6e',
    '76bd674f729dbf8029b742024f83845fbeb48ed5e103bd167c8d5fe74f2db72c',
  ],
  [
    'ee1f7f74378e75525a1a1a0368cc0a1f95fae99ec882457ad569d5084ce6ec2e',
    'ea25de087c259c7b6b5fafb636cb74ef7598b5d318419136eb4c7df2825cd545',
  ],
  [
    '698cf1d0af829c16722b04d09a8d5d71f9079653d6728df3177f36b64199b503',
    '42bb22afff2650c994746cf1110e91deeb2e5a8cc0b7803a39c561a0454c3689',
  ],
  [
    'f6cf7430d0c0899af17d44d497e86390abe58d241f45183ec8d8538b59cda1f8',
    '639b49656bdd5cfe4175803cf062ab2c77dabeab02317310ce67f6008d1d2ca5',
  ],
  [
    '1aef2bc6b14ca6b13ba274f5e18f6a4b0ef767f671b63345bad1b7917ce8da3c',
    'e7a3df1abb49d3988c816a97e9fe1cb175788c24906fd89be3ce58ab45bdebc6',
  ],
  [
    '154449621dbd0651e23e3f0cd8a57c00090ee485fa6caef8b2ea5a9ca27efd8d',
    'f4840bcea233a8f8a49cf05a21f181ba90a4f1a214baa4bbc21d69feb80a5b92',
  ],
  [
    'a812e1c1bf413c0b3d11979671d31bd9e722a0e3d754ba5e701bf7e108edfbea',
    'e026625aa36d75c0589833dd2bffd17945f1845340b5a2602c320f72ca34f1a1',
  ],
  [
    'f1bf96cb68e8b061dd6b9ea1a810a0e6b633abdce42804353de2018cd9245fce',
    '83680e4562137e2146e9062b97fc163250105e9f255ff3cd57bd4e0c5c35640b',
  ],
  [
    '9e8a957e1ef5956d4923f44f1078e1454eeab2eb80bd3c454deb1b4358b3d1dc',
    '2755ade75770a7d79494abfe6d4538fbad6b5a57879c825269157910be65d402',
  ],
  [
    '5514d220b18dea352fe0da71e6aad1c4e886b625df4d396a9ed876a555fe1e96',
    '71deeda344d9d09332b5eeb683f4a269dfec172a5ec80297a00e5489203c4750',
  ],
  [
    '053b15a39838babe8eed1fae269c0a22c0179fd6cf2ee63f0df4c189924f90a0',
    '227f7a411687834374ee3f72da4b220f81f184d4a07f1fee7d9a3ffc5fcb0e6e',
  ],
  [
    '0ea20556a0627fc026080c9f77ebece360afade973dc37b4bd1e5de1785de52e',
    'e5a72ae52c69665afa0b0d1f172b935d023c3b7d9e440505eb4a9998ef018e5d',
  ],
  [
    'd20ce4a1cba767a5a81ecdf584a242fe3cf203c09741dff2890502a50b84b8b5',
    '8966e4ef6d06d37055b797a6ed8a30506173ced980d5f0d7ebc38cac98112c5e',
  ],
  [
    '72106b06a1a41dd994b100caedb364d8940ae23cb78dbed93457d8f4ef390aad',
    'bf9f29f7dea634b59199478df775c34aa896dced7a2d567ff891da021e81a001',
  ],
  [
    'db318eca9b592de388ac48b0908834ae66227e8bb21363f8a166b91cc0e257ef',
    '0c3d1e3cbfc494b5746ac242066b7635dd730d6c08450e0d8854de8bc1c27131',
  ],
  [
    '14da3019e3f9e19a2cca04aa279d429b6de5b6178d5672f1377abd62ba688cef',
    'f07c150ac392d8b936a3d81096976bd15312d649e74320fa1521ef4460f1d038',
  ],
  [
    'b10ee5fada38fb3c9a9a97dafb25523854d2cc9a960a9196619085304570d0be',
    'b47f752f80ed3328ae66b99dd7e60740996b7216428c241b83d3314696829fe7',
  ],
  [
    '5a1bc167ac3bc634097cf0c0dba0a33f2c1ccbe075cf563d0801b4a1b98dee17',
    '26e973c82d20d7db7b56e842cbc75af920629661f4537cc527e08c8525ee5263',
  ],
  [
    '0a15937a7272bc0325748cf1e5ec990e711d3176b0f3c3773fe3a5cec2901f92',
    'eae5126c4b840173a238e506c336c23bd2568f1a58184cc8e2b2d761f1bd8263',
  ],
  [
    '4b36f9546d8ea0c0c8ac57fbc71f1f15125c67586616b9ebfedf3eabb1561832',
    'c51c0aa776a67d0bfe23444571e2276e7c958c29510c63e2f569cc6e37be5b64',
  ],
  [
    'fddb0c164af3ee5222665f69fe27e4040414fece1c4a5b2c844d297dff7e8fb9',
    'ed08aace0d35c67193b82a91ffeb49509bf900ca53b08c913adc372973e04e9b',
  ],
  [
    '7b6e0f6021fc995f60f2e384c2f31273ce40ddf7bc0eeb444d52d29df45f1729',
    '0571e67989f23a6d9f86fc1cf140b27a4abd3aaddbeab17ca4d0d5d2712a02d4',
  ],

  [
    '42e93eaff34d5e24a3748b9cb6552d9ac03ff82add43448b2d02854066d9275b',
    '8f1811d08b3fe1a2c388d0b25c4b5bdc2093400dd72fefc7801ae5b256e0b4f4',
  ],
  [
    '67cbae3aa67915ebb13d17f2e33e4998562fcd107cc6cad9249ccba82e6afd6b',
    '81fed1fa4716ae4516253bb6343d08955086ddb33ded79ffb10ffb26d94c39ad',
  ],
  [
    '15f6f6db96aa474b723f4652b1e33326124209bda9d80eb97b434bda2eca48ea',
    'b6640be53857489456041f843e0a2437e83adaf3b09d815dade10bd13709e5ad',
  ],
  [
    '24e0e933af14a91eb674e4a5bf391915d567b18b586d33d0e87e42263f34b020',
    '8f1d34b71ad4e9e2675ee6d291d89798a3a728aaec54c5d36acb5d640b7f7ff9',
  ],
  [
    '1b9b296436cd2ecbc4bd1fdfce10f69edbc38b9055c73fe16c67267c413d703f',
    'c8d30d523dccf482e027ee3ec16e416d7892398ba8ae5eab7ebc7f55da73b195',
  ],
  [
    'bf78320313281a75714474bd12168f8056e92453e602a37bcee101c10304b8c9',
    'd05f8e8ffb1c1b9d1494d8943d9e3038375cb31d075cddd28c07a7e4e4739124',
  ],
  [
    '998c537813889f9efd55240f519a2945caeca754dcc325dabb607a766d359414',
    'a41b74ec56cd6e6dd5b482c845d2a86e349fcb8a09b83ea997742bcebc349491',
  ],
  [
    '9b1b5b08234c908f7e87d19e8a87b6577a65269234d22a6415b7532cff82031a',
    '7326145fdc64ffd46824574974401d3b6d4ed13bfaad26eebb9e2f2231bac4cf',
  ],
  [
    '25cacd48316fc125f1decfa3d55d1fb101c5e4e8d820f5d899cd6079ee50a7b2',
    '3167acec7a5e74b9f4362c63a96c1bd358ee33efb3a431b33c26972e8dcbd5e6',
  ],
  [
    '3febdab11c3f5ce37a44e94b59330c3ffb8c8a71e8f75f5bf03ff51b72c57d1c',
    '6f327a4800e69a787505bda0db84f4b14cca7e0d7349bb7085c586ea92cc02b1',
  ],
  [
    'c68ea22fd9f5c34dc2a9f6d0f9810d1ea723fd2a8256efbea2e7aece6ab03d77',
    '51ba2d89e404f0dad80367a0b641a5a0200231ca4abd84ff230c92e3a15dd47d',
  ],
  [
    '879b9b97656988d6129870bcfbd5b336da267a0b1bfe1f1d81b52fcb9f094d9e',
    '4c856902d8956725e2326f1f3e9e8eba380d9cd8276fab581c926b62a9450622',
  ],
  [
    '07272dcef5847bec8f523df00e951f2ce005abe4e57269da964c153f79c0f161',
    'a8c1351aa6847a98b2892ad1769206899cbb6ad2a1a9896692f6d4deb45b1e33',
  ],
  [
    '6006c9c30c107ca87a1619a93b220aec49a973962a9c899fb5969b126b7dcae0',
    '6687deb53e6cbca0f67a46dd92164d37f3f96c1ddc72fad2cd9c6ac18aa80675',
  ],
  [
    '0f9fa3fefff7c5114351dbc82a2d3fc57a4db5f26a5f797c2da616fe69558a6a',
    '280b672c6034b50ad23a71af2ba9700f75bbcf53a04beb0e844bc0378ddb4218',
  ],
  [
    '0cd6a46631606b0a2805850cf67e264f812ca23180fb1f36ddeb521be045ee34',
    'e5c8dd1b29ecd0e53de89f377c18df3f1964047f690e8cc5b7578ba7d0e8b9fc',
  ],
  [
    'a0a1a73c87cb3e32d171718ccc10bd2f4d30f487d742093efa66269374575a68',
    '20916154896469e1784d5fa72c3dcfad12d30617385736859e3ae862cca41012',
  ],
  [
    '4a64b5032768d6902e92ab8ec6e3a092c4b07c0834863fc0b0c59a78b5e80b54',
    '4fc8907fff625ff5ba3d61254d1ffd41376c0ca6c9aefec97406ac0a74afef36',
  ],
  [
    '43f96b0ef4664cc9c10188ef8da3cec1f811f89984ca61aa6ea8f98775afddc3',
    'c29372b039a06f9c30ca4ab12df8c603643e5928cf97b4806d45a0000cf6784f',
  ],
  [
    '77328ec31953f85c83c0ac053434438df67873499e1a859c50ac3117940f4be8',
    '21715086c1f5bc18708de1c229bc52c15c83ad9981fe6305255231196a9edbb4',
  ],
  [
    '6edd8e8bba94d2637dc96dca99cf7a36a5d28e22d0670a040808c38bac35da14',
    '608dc00844f10b68005f6acb24e5b0744389e0c0e08554ec7ee3b41c822d03af',
  ],
  [
    '90ef8c06c0bcb90afc649ca1fdc05d419fe523511b0d8fbe3a708816cb04101a',
    '1315dcd9455224bdc31aa36941dd0c5d052097ce1f1c7b7e9a1d1caeacaff056',
  ],
  [
    '4f010554463b026d99e10262d476dd6d559737b36ecfc8574f20690ac2928a25',
    '239cbb5d7b56a2bf3db398eb2bc9c483f7f343e8b84f7fe1be27cd29df07e2a9',
  ],
  [
    '345bc986a2a915c7fbe599fe6b0ebd97feaad673f1b83455e909c2007d4ff52b',
    'f564be9146a6a284af0d1bafe6c84c4252776c2eb49db7a8127994cd6af22830',
  ],
  [
    '58d828bf41e7eff9f5df812b0ad3ea6b2ad53fd75c8af5f242e6280e3aef4a18',
    '97a080c35ef5ab9f9d8b84e345f4a6c98b1fe211213d7b832b62cceb83cee322',
  ],
  [
    'ffdb9f06b0ebdc03924a7a68cb4234f0ab9b01f0a7072e462cfabab0ea151dfe',
    '48859de7356aa72c3c9e983b36bece4cb94cce0dfeb4632eed40ec91cf3beab6',
  ],
  [
    'ba2a8adeff373c9cf0f5d08c99997f52652c683e0384b3ef936ddaf882962519',
    '6abba77004d21162a2f853af0b759d8c38186ae7515791275c2ad78a596b63ee',
  ],
  [
    'd5609d285b4eebd1170705f96ed3b1cae06c6f20b58fb0cece5aa95a17becea2',
    'b3a51233fd2ed92586f6f8562b0c977e1bdfa17261e8283207c36f0de0b66485',
  ],
  [
    'c382a1140c7e6834f792317efcb8912b169e21488a69270e3d686d01ec44fa08',
    'b61dcfbabdb4663f65260703d4d7d3c480648b327ed66b381286aa014a7cf276',
  ],
  [
    'ef024fe12638349e65c9da73839790e4fd5a44a617128f6a1da1258b8c3288bc',
    '12e4251140fafccad47d09b91c22607258a621e1784393caff990ba4ef6643bf',
  ],
  [
    '4395c302168c18b1a64a3eb8da8d1b30228d28b42a72d5dcb7ea09b7436848b0',
    'a4ec59dcf9ba1c97dfdea22fd0d4c2bfb9f818a85cbf8f66a62213065a8d0fe1',
  ],
  [
    'dd1474611a80c35cacd3ac987cf10cb034f1662397452677ce68e0fb90b63d46',
    'ddfdc54b0438cf33852f3c277202daf7d3f369de0c0b064140999c43b903ebd8',
  ],
  [
    '51b814f09164e5dbb56bb489247636aee350220082acae5998ead6bba8b11102',
    '7209ec792b1439b58097ba96a71e23e954566bf23e6f0c45e74eff87d48a8ce5',
  ],
  [
    'fb4f539b1a6a53a4981cc3116982dea07221a93faf16496e9e5cb3777df3f630',
    '4c65ea2bdbf991c08f81dc3477cda876e50dd54a03e7454223bb7528b4cf84d9',
  ],
  [
    '935f452fe4013da866f9071520d5f6a20b2ef4b0b752186a1f3fc33086f78d51',
    'b187361f8232b3c0978cff88e06735b05bb1c059e72bc8996f0f3e84722fd5cd',
  ],
  [
    'dffff75d3795ca6a785cd01718024d32fce32b103ad90b9a019583a3acaeaa37',
    'f3463e9976f72e878c20467671a1277c514c3c132a8bd42fd03c626e027cb9a0',
  ],
  [
    'a8b251cc552d8e08406e586fb2dfcba8ee96e075dc985fbfa97c0e2ce20ca234',
    'c9032196dd0442acd76410d02e94ed9966fc94826e0cc549dc03a3ea0a88ea37',
  ],
  [
    '245188c5fd94ddf3954797e9a4a548af2ec4552129c3b01667e7ca69a2f43a96',
    'a2958c308cfeeec3ae09d5aa109d640e070274b47baf998ff3c80813c46753a9',
  ],
  [
    '7a2de508fec6e3191acf52055e652a6ed8bd87266130fdebcacb7982535b1d25',
    'b58b4a3407f46a358b3ddc831044ee0b121aa29ad281f806bf7d85b62f0ce69c',
  ],
  [
    '60ed1372de483ecc0d8c372ea898fc7de771db343fa913a9fe89158c2a5d3ef6',
    '2784be8ab83ff7ad805ce90a1dd83a8820d807f08f314cab83e124a63d56cb1f',
  ],
  [
    'de29eae66f83bde4e7a89274bdec5c0887ba33f41938b4e583798dae2c0924fd',
    '4280db677266a676794ce109685be79c8282bb5a3f77332a6ec732cb920cc2e9',
  ],
  [
    '787fa80aac98cdb53861c745719cbdb55c5799b4b55e40902ea8bfd43c96153d',
    '5512b6bc1937bd19da06647bbc70a9a10f073dc2616def5d51246a46544f5ab1',
  ],
  [
    '205967945d889a439b23b8374f93c46fc95bc5e27976fc2c881af20dfb3965b5',
    '71f4fbaaf5ccaae7968e3715e1e048ffb9f724c84e9bc48e71603ed43cd28235',
  ],
  [
    'aadc1f1ba60de336982f8ec9792a58f2e7dfb42b8bf583bbc9a93e248651e03e',
    '2af9a93ded71ac66b5eddf25ff6964737ead8ed52afe683dbb4205bd0d43b92c',
  ],
  [
    '0a30a404505db4e6303536ba1e248ea851b219625c2fda637a4c2b47b9b14b09',
    'b7fdf159f5af7922cad9c7143d4aee6cf70d816a6b777f0ae90675ef5b6243d8',
  ],
  [
    'ca2e0595158a9115c4411d5d7912d8bcadd6713154f412dcac6254b04b3a3515',
    '901117cd1d8a977fe5ea3aa47f707d4c9335b857dc0c43cfd8a39f8fe91be038',
  ],
  [
    '36e8389624e2c836330c5dddee7c17f7ef446ff77e424eb2efacae7454e0029a',
    '9741e5d7413dde807542da6dbb11f8c64583e4a4e77140ea060c0af23464666c',
  ],
  [
    '324b6a9131392ef990740c733fa77ca3e822c15e83989c1654f49928ef00b5d8',
    '502c977e3aca9ce0dd1e212839edafd4b3f3229b0f39e3f2847fdaf86ab90e26',
  ],
  [
    '503096741b62e7f68c57ccc7c70ff56b5f110629036e377bef991e84c9eb07ea',
    '6c4d7e7f70ffa7148fc7df04d71c63396f5983a389eac248f131f527dfa52595',
  ],
  [
    '15ea9fbee82f05ada838ce48944c38606f2284de9155201046c7ecdd36e7c900',
    '68eaa450e1d9bf2a0dbe84fab91b9b1afc2f540be40457d0c83101b9aea9ac0d',
  ],
  [
    "711ab4b2b371d42cbc569cc4a794d585426964af4974fe69f3a4cbebede80f04",
    "5ddad0baf14b47494faf65a310a99d62db1f55cae77aecc51a621ea9ec836abc",
  ],
  [
    "1cbdabe1f674c10de0ae8905e5bbe197ad2c01747dd396cff0b0c35f53bd212f",
    "d85a70fbcff957c98004fc46139586f7033d48c25705710c5c71b9bcca926483",
  ],
  [
    "82cfd4ef4460d96e16434664344512e38fa5ee086521d31af405282e25386f3d",
    "0e75869fe212e0769250dd6e032aeb894043abd0c6d51b0d5cb456a02db03246",
  ],
  [
    "d5458d71c6f92cd3a9e799e1ab14d3e4820591083a7f31f7f190cfdd200a6fb6",
    "fdb85f12a78b465fd70f8f0076ac510d9fc20d2284440c8edd37e12d32417c30",
  ],
  [
    "cf8427e336ac6efba5bc5ec1e24fe8f6d1bf5dcb4ead0ce02957b100b664fd9a",
    "c3b722ec665328071128854b17bcfd9859fb44e0ebaabae306fb97356a12a4df",
  ],
  [
    "e23e4d7c66aa0d2265b8be9419212adb59d8bdfb60c95a6c869b5f5aca03db1e",
    "e2aa9747e798d8e75265f69ee92a180a396e5677c82d2e6df17b8c1e30080b5f",
  ],
  [
    "37b1488e9cb4ad009d33673049512a27961afd64650868ba551fcffbd0f1b6ff",
    "a254fdb2e82c789488f6ccf1183de72b2a71f40434ec2e5b1aeaa8126ced5705",
  ],
  [
    "8a0ffa5fcf5ab430da798d6106d9175a966324a8645c9a29548c617b2c8e2bd2",
    "20a29121e95179fce26015b62b8028424b1b2aedc41a3bf59c432486c51e3715",
  ],
  [
    "d90e078556aae493860a7a52031bba8d0f1cbed3c7c83ffba104e88a38da80e5",
    "e1e40cc2385027cf0240bb605c8b79c458f461dc7b6b69c8328fc9cc01c74bef",
  ],
  [
    "10611d602c6330dab387742ef56fb026f50a43aae37e2f4087256fa88e838eb0",
    "a3c15f77420dfbf4e259ac4e6fb9207958517fa7e96e715ac02e9cd2cd1d53ce",
  ],
  [
    "34dd36eb2c7761ac73053f69f5d2ffc88e306934eeb9d7448ac9b7b98c49fb7d",
    "e1805c994b0b127b4227b4fb9702a00c502bafccc1e5b3a80999cc05b279146c",
  ],
  [
    "26d3af8965d7dfb86485478516cb6b7100bbfa9d728134ea1cc4d69def914603",
    "91857959219f90d7d3c35f669af65e1111231e1b72fb464efee7964ac99d3ba5",
  ],
  [
    "21a543c136c9fe2df8ebb32f7c8cf473a47d2c2284e19be472c93fbd14f16be6",
    "a2cc73c81c535b37374535be4ceda8dacec8cd966651d5294ef07b872c04bc01",
  ],
  [
    "9052f6c6e7da0a5fb8daeeb7e68a1c78057d393ebca805f028c454e396f04967",
    "9870243c8998c6771da48888719e2a956e6924d387e3ba54f703befa83308b22",
  ],
  [
    "bf8873e8402c2da1146fa06ed9135ff22befe4342e5edea1b4005454bd4d8bd2",
    "58f43c66b1303ca1b3a5b05c67e889e7a7f69e17def02732ea9fce728ae7c55d",
  ],
  [
    "61bc22357228624312bd3f2c97731623cd3d04ab7091b3ab5a7a94a377fd89b5",
    "2710489ca1cfda347057d4af85278c7a36f3d229f58767c66b86d0ae52e05b22",
  ],
  [
    "28a583b85acff16d1358b3aa1ec785f0d826850b9d95e4c1dccfcba0c93087f3",
    "d60a689ed76c01815423965281cd8ba58d98a93a113a4c707a55abd2caec12ad",
  ],
  [
    "6b20f59965e149c7fbbb24a3f21a639a2736c871c888768943c0c8f6b8212b01",
    "d8ce3f692cf19141cbe7ec8403cbc460a3896a58e2cd2e6463f9e1a6823cbfb0",
  ],
  [
    "b06bbf20afa7674ff65e565e474dddf5c3de448891fd8f5169ce2569d5f70e84",
    "7577ba1b4ffa05a9e38fbffcdac3c23e533c31509918750c6d222c2efddd8089",
  ],
  [
    "c18dbe3fd28006addd1526274f0146d9702d2b474c2943de6326167569f59e6a",
    "14abeb2903f325648a1528f50078354b1f6e886746a1b7231aa9e17b3c58db1e",
  ],
  [
    "c8194e9590576911e59e40f26eb0c76e2748ac9fcc0add375cd0d087b635dbcc",
    "ab31736b0357c55a794a2377e554f6cfde65b8b4ce41842de4d032116e801612",
  ],
  [
    "c4a7cf04dd3ecdb225c3d739bb131cc56c12e8564f9ae01ae8d29d950f46e1d9",
    "54da9656b825df1eb38b0fa1c2d5b0200b2a5c206db0993b6f42e83dfc2abc0a",
  ],
  [
    "34ff795b39d92779c564fb90f2b8adc6a03c8cbc7b228beaf6b13987a02c3edb",
    "4b73bfd854b04063dd9ca32354c5adf36810151ea8aa4a950568f0d58c389797",
  ],
  [
    "d153683b389ab07a41e46aa88078d71b1d452e6b62bebfa12105fdef4b3de3af",
    "e191f74c65ef6955efaa7bb4fae3d1dd90ed5f5be4017eacb0ff73046f9bbf2f",
  ],
  [
    "033675a8bea8658aaf8b591193ced9b7cd2c5c9e8b10e6fe80c5f35280fe9ecb",
    "3247e9aab42781901e5322b4576076b24e044c2ab399b2e503fd645457112d0e",
  ],
  [
    "528cc2689a0fadd738f4224e60be365c4bde5fe9b9ae47121b88abc49d20cb5e",
    "57468fdbc91829642f814158256eb83730033bc8e6fd260d038eb8e0fe9ed2ab",
  ],
  [
    "20da6121f6d5b6a594a175dc9e5f7efb8e0e5013381625fc4f20d84c444cd3d6",
    "bc17b92c00b793af399d201b256fadc5ebd87af18312e57502384acae8be6794",
  ],
  [
    "67a74fc0e9babee743373ce494221e54a9cc9e5e87704319266478b10ecce214",
    "7de740b0aef2846567a21e8a235042d07c7e9cbd39c60ad4ef054981958a5192",
  ],
  [
    "12aa15113cac49c8bd5247711b7e9877eb32ba16098907cca3349db2c0aca7df",
    "d22cc2cea8d9c8de790bb6f4a2c537fd3eb51951000c44027ed67f27b6729ad8",
  ],
  [
    "3be7aba5fbbaa1423c97137cf326f52b25df02fb6efd846ea9e6e955ec63a6a5",
    "476f3dc1f954137cc159ef5f3936d2ad6c30d05ae274f070d20f43c1acbfaaf3",
  ],
  [
    "5a254e8360df4927c7f60efd438e746eb1a7a1133ee89a933472e8f4fe643d06",
    "26e5a973418a04ec096bbc8093b60ad0c501a4e484879f516ebc9a2d60b2233a",
  ],
  [
    "43bdfe2a31cd67a8b58e54398eee22a09fbda460a95c07dc3d1fcac98b75b8ae",
    "40bba576a63e9ad9cbbf76d4222541649448fb70d7cde8cd0d9bed2c6610dce3",
  ],
  [
    "a584e12cafaab1d0fdf3129570c89f7721e92ddf6de921d1a5d572364e2b33f4",
    "d762586feb1234a6a303d86a493720ef71624a06f56219b47736957fe698648a",
  ],
  [
    "4a64dd22c27e927db48e1df1d688df4bf2ff0544f7470eda04ed7ddf7492dc54",
    "d97add8eeb7eba803e36e9df2ebcc7c1bef44eef5c4c273d6f325826e371eb8a",
  ],
  [
    "9e8aa24d97c905dd0dc62d0e6a7b02ed8fbf2f5f3a3ea78b0d1d6ccde685d979",
    "1bab75294e9f46ec4eb0f55d36229e48753c13ffbf6131964499d3b0d767f515",
  ],
  [
    "a1ffd8729fe8a35ec1cf64f9c00ca92400489653de94ead0a42edd30f7bc4210",
    "bbb60dda81907d3370aee3943bb3c95488daebee78d00261988b1e37e7ed84f5",
  ],
  [
    "9640c2bfa6d548dd2b964850e939b2be16cff6ed529bd537c9c0785ad6c79a08",
    "25a41383818122dc9a0c93a0beceb7c6f5f4af34792d26e69be62d9e9a86b23d",
  ],
  [
    "1378a54f26ad0e4f4a45c2d89aa102cb57f55ebb4d8810c3047986b0618fe1a8",
    "703ea2f5f5e6ccd3c5c3edaead6770cfcd9d7cc82d87a853d598b7e178598ec4",
  ],
  [
    "dcfb99f7853cebb62a88e4cb0ff0562b76dde7d03e895eb24e986abd16ee735b",
    "c459626c80455e3fe052031e8da4ff41007bf3aad78ba8ecd8b25c855739e9a2",
  ],
  [
    "8b65b2e580270e54ea7f62221c1bda58fb9070a4adc5b939aeafa3a8fa187f58",
    "4d163e38731cb8ce2374b65a43b4182062faaaff9cacb4a5890e41d86e100f06",
  ],
  [
    "dc2bdfc2b01a1c758f9d9b21978eca0e50050b6e1f7a8bb04b2dde072232e145",
    "04542bd9ec0861b0a102bb6d9eb731ec32d9a93608d9d51aa7044d09181a9cf0",
  ],
  [
    "f2407f0381eb6713bea4fa5e7cf942f15afc10639b04717f97f12c0e766f3ea4",
    "ccc7984f0fb2c8b94bb9e8622cc4d3986058e063775c23d0c5ff468dc12d47ed",
  ],
  [
    "7eadaacf07873747b3fb06c9f1e7303a4d05699ffd6e878f09abfb05cf0b0a90",
    "20c1a64ebda949f16be45b8ca45e46f577ace1d3ac7bded1f5aec24835e84d56",
  ],
  [
    "cd936d087e5786b79e484419e3a9689a09fd6734dd8f9fece73523dfbeda0b98",
    "4a0483b840866f0aed0282f3a077312553d7c7c62ac252710b30fc2e789c199a",
  ],
  [
    "90afebe3dad8fca97ee3da1e8bf2b36c8fc09146e0afd39469d787702d0e8844",
    "6a8cec5a506097174ed1cdc4ecec9531dcf9063940dcf0571522993fbb84ae9c",
  ],
  [
    "8d9e7c8febaa001e4e7ec4f35e2e91042ceedc7248891c21b50f353eb1169e50",
    "dd4095ca1215b4e9707fdd12100e3b89e11f893545ac7a118f66037415afdf62",
  ],
  [
    "47635807748d1f2e5b00fcff13d059901858257a7df4ca493ec537ebcfb1930f",
    "687cca590845fde27a2bc7d72513ff8abbb43ee137cc046997870e0fff638970",
  ],
  [
    "2f7fee7ab82b03efa18f526197cf1351cfd7162a219e949cb4cba454d41b9ebf",
    "d27c59db6213cbb7417cc2f0bf6af365bd114285f868c926d76433add881afe6",
  ],
  [
    "6f27cc6135c4de3fac6a0fec36f260026e0784b70eeb62b1db879915ba17b09e",
    "0fbde00da9ce8712314a326d369c2071dda3462e03851d6534f35c165fa7f6e6",
  ],
  [
    "405896af0861fb876e8f705d820091122667f6e935bf6659d0bb1d84f6f787e0",
    "f13396cda08bc0893b94bded86b466573a2480fe170884a04d665aaca29f3ed0",
  ],
  [
    "691947dc74d57e3215d3e5ca67a83d3f9f3678338db23fd89c329c734993cc17",
    "fb7206152c4d4346f37f39006d650529df414bd19bbef0bd24b93dbb88fa388f",
  ],
  [
    "1144fd1c0e3c60538a755bd51a4853df61e5f58f6dc5b09d2fc81df0b2d6ac46",
    "07d5945c975e50252f8b5cdd1bc70d2c80d334596403846083b1747c2d51ed58",
  ],
  [
    "d4cddec2cb8a23153e7659b1c227890fe9871d5321d34b4eb91ef465d2872040",
    "2da383f6fdf2cc3c7f0f7299504fecb3bde8aa19d274c54ed4dd240be4ee5be8",
  ],
  [
    "83516d2bc193e45629ccd1d8a5b0326948527e11febde9fe9936fa4d13986a63",
    "c00b3c2324849f6a318558a069936b272de2cb0d1283d4e8300fa6756aae5433",
  ],
  [
    "2e5b916e2bd3198e5fbd9a285f20445b4ceb9c2cdd06e1479e01f48a473815a3",
    "e50a0f65d20368c097089e577ec8fb494a72828bbb27b9ef9378c2bc63cc8978",
  ],
  [
    "0d6eeb53c84da7e57b75f8a3b8cf43af1b888d754813dcc39e385b657ca695dc",
    "2a5397b00ab476f5dee09f901fba28c902b62a26ebdbaa598cac5d10547bacbe",
  ],
  [
    "c699ec2a4ce150e977e5eabb86e4dd572a3cc4b6a89d81818523267a2fb7edf1",
    "62efa55018c6a7d769626e77805dce1a2e59164180303d3e4fca3591f9afff74",
  ],
  [
    "2a1310ef675d0d409887604faf64f72af1dde6938d1527ba7ff2dfbf12a68c14",
    "6ee1d8f4995338115c7a6f9e0e8da83aa17e9264d42eada58cd6bc3f48788d76",
  ],
  [
    "bfbffdcd93947b249e942a1474a79b3793a7dc939995ec3d7785c8ff712fc29e",
    "b46e54b4eaa32475abb8562b40ceaa079136b9815bb8ed36546bca17c64dc1b8",
  ],
  [
    "8cde836507475b0327c0fba35bdfda913939a63148c64a0246f06e9233dadc95",
    "ad90e15d82f2ee52847b72e3c5c7d5d6491bd1c068109e5ccff58ea7ac8577de",
  ],
  [
    "b0fe950ed7845adc669af0b30b0bd88197fec3730328ca98a065a2029ac312a4",
    "dbe942e6b1947ad0873fc7e69420ad5cdd8f506a2653f85a66506dc4b86a9695",
  ],
  [
    "6354560214b88a1638093c8c428aa27714fe7020ce13adaf5b823344a86c2b0e",
    "02785b1de9b43ddac4c20f3551f16e336d49f5ad9085eb46028e0aed8db58a8f",
  ],
  [
    "5ad04a5ebc974e8837ab6997ec0743021066240a041ae28c88fd8b7d5133f970",
    "3199ca524a786a7a6e8af7629c2f39e65e880ee12875dc3da9fb995cf10ec208",
  ],
  [
    "f89b2129ce03c1c2a2e095a84c1a5596093bc325ebdc06717d2fef72c3c6bad6",
    "cd7e2ae708614543e7586dc55c5542609c3c50f2f20f7e6e8b559481da42cae7",
  ],
  [
    "51258206b4545977bba8aec6a2e62e38151e0bd6cade208827f9938808d935cc",
    "843889f170168b7689f6407b72d422a2b60fbc17311c9408bb71f2a3260bf028",
  ],
  [
    "25394251f89a3df37c7727b15491066ba76d1caa0326c3804b43c956d00f63ef",
    "fce269bfa487da820b84703859ca228be6b9de113da1c6a4dd2c05f2aa6073a9",
  ],
  [
    "1e116e5c62561a19cea15de3b5b278a92978d384b6dbe909c8023d694e330ea0",
    "230e4797dbb2a7cc830891eb3a673f96327fdb03b668c95a5c278eea342a89a7",
  ],
  [
    "8beb061197ec5468ba3bee064af31cbb1ef327ddc6cce084a1142d13eef57bee",
    "970fd6a941d31dc0a3824adba7f970f537d174564ad1c58498fa4a632b80e249",
  ],
  [
    "182af7da1fa4a31f841dbf7447cb8dec3b1f01b6d17880cf5b3486860435a6e7",
    "b5736285f3a8412a2f4a744fb52b8f287b26922358623e9888a765e954d1e2b0",
  ],
  [
    "1cb8b49b9ccde7e9d0954c9d721645ca8a82138fff591ce4b71807853d63e1bf",
    "10630cca7f4ce9bc8b170e0fea0a5b06a94547f2c00f759dafd27659383b6ee0",
  ],
  [
    "d32d54de7cd454a5ebd8eadf84ea2de4907ee84444d8b3fecaae793ebefa4b31",
    "3881eebed705a3ceca8cac0d3f4e67aae5577dc3b86f4a9b975160040dc79a42",
  ],
  [
    "6faa6cf51760ac68504f4fdd05ae06f3956c4b71f3b434379263fef010b6bc92",
    "643974c4e2f3688ffd5a7e15002e6760512eff22b25864118d79030889b466a7",
  ],
  [
    "afee2b765588b75f779cbda7aa28645440c1df1bb1656b357659f6a2936a882d",
    "12435f6832239b50723cc0bc1d1478cc0657c4f37b564a823cb0e18eb04c80ae",
  ],
  [
    "09304d35c248736d4089b8c77e3211541eacc8ce90ab62c1c3fd7ee2181a33d7",
    "446123e8ed6065138cab512c6139bf45417e16e0d23e2a472bcc66d3e72006e5",
  ],
  [
    "ff02fe42fd36ade5566d420cdce609062b67a730cda4bb0a9ce62f4df8e77cc7",
    "7ec0366d0064febd9af0f3438ca6ed7688557829b49205fda03c5d3b5001241e",
  ],
  [
    "033aef313bf7046f9b2cbbfdef9287125ff1efdb2c4368280e2add1666323ece",
    "9f115205a8e13ea4b675a0ca40d1c837398048045a76466a020eed8b89234b24",
  ],
  [
    "e9da9cb840662f6a584fa4dc1b30173918f63267a190ad3c8c7d5a563cd93d87",
    "acb1821fc6d49b6d36893d067a3741f073d5d7ff4e40242336250e7f6d2e0ef8",
  ],
  [
    "df300d03793cd467eac164f2a71723c470974a096b11ad117bb4335a29780e8b",
    "b9cd097241c3a67798e3fb72e887c12b10a84bba29bd071bc1d67fbb3622839f",
  ],
  [
    "12784f6bf5c9b29588cced3f0c83db6994dd3047d5af1fc1ec148e9f9b625425",
    "6a1c43af04a02e12f0c7e18c91108d9ca2e089cb5a092a0f2fe2d61c9e1ef8a7",
  ],
  [
    "01df43fa15796e16693d7f00362ec0a2204822874b0d6a8c996b5da2cb42006a",
    "2b4a8825fcf5c6c9a6496bbd06298142c7d853be40ba5d4d05c5c2920bbc0cf5",
  ],
  [
    "a211a449c5db8a02c254ee34a5fcde978e1ac5c35f5965360f845b808f516792",
    "3399f6c24dc0be3188a57b469d9d8782013fd8e4f77e329355a84c53759f69b9",
  ],
  [
    "13a5bd51702cb07fb83f83ca9be007f380af4aab757abbba97b676aed7fb06d9",
    "a75321ececec3420409bcf03a7b1cf6105e41d50f4cf14be94974261becbf071",
  ],
  [
    "56c418c09d7ca11a20f50d14623f81da2b888fe9689fc16e614898fefb2c2f65",
    "8aa1e9c41ebdff7c9dbc291917e105d9b9ead0bbf43eb1a5771042940089b764",
  ],
  [
    "613ea1f4c437aefbc51a2f9973bd3bd0e15f5a8d821da3b151c44be73bec8770",
    "5f29f68dfafacf2227f4389767a477474e104d58783607d76d69fdab45ad79eb",
  ],
  [
    "cd4973b711b0ad25d9a66ae30ce2e996c84622112ab603799c43a1604a63e494",
    "aa039cd9d7dd8a30b04e720b8ecf11b7a2a588e5c37a5c9aeb44c7d43c4b4d0c",
  ],
  [
    "dfa3097efd1c04a6b410e6e0d45b404bd9e8e429af3b957f8f27102fcd66c1e9",
    "e618cb1b840fe0f50066b53c442abacc879cecd298d5d54c65c9393d242d59ea",
  ],
  [
    "411f3c4fbb8dde03c32d77b4b99804a2fbcf91dd4d27d40adb06d291ae4dd78a",
    "d60a8bafc3a1d799e9753bdaf269eac37d7c2d30cee75a019c0767bc649ff380",
  ],
  [
    "66e6e29cb326701a495ed4e5f0bd7cc6020bc23ff2927f3395850003666dd580",
    "fbde61a89bfbb4678842af7fc7514dd1b31a3e67734bbb2119559f0fad383ca2",
  ],
  [
    "ce131c1333299536744dcbed0763fb1945dee33137ce2ee84abc3d71f310d67d",
    "220f059895efbac6c1fbe56675d92916164076916c9701e5f83a7eadcc5523f5",
  ],
  [
    "0a4892f27d17f37600d9e932524a7c70f0e6bcdf3dc99878b1d31d1d06b41fef",
    "856295c17ae801b985cc014c51fe3a383c30c9b284d68017b89881a8489e3182",
  ],
  [
    "cf3652be71c61da0974b1dabf1368ba71b78d7bc5599a93bf1159a9c056e087b",
    "253bfded7667e90d2b3a23fc50318361d3ead1dd758b406b5ad74550de327e9d",
  ],
  [
    "8b510803b9a53fe51a0463e6f6845c6da10b5083623a5f1c4590bc1210544799",
    "3d5f420a3247cab7ae437c631fc021d4bd1442d40b910a695c5c668003abd5f6",
  ],
  [
    "da9479f3d47ef953c2c5f6cbdd50a562fdbd4be21fe4963ca62223b2a8fcd35f",
    "d69e8625110391879d4aa34b638ce5a90bc684cd2a8c9ee787f9b4dde8826617",
  ],
  [
    "9a36fdb6a8a9671b59d177d2c1ce56b60f36db69eaf83ab9175f475d3991c591",
    "46f36743f8d3cb83a6f4ba5b06a6a38dd0d5e8cb6c7f93ce8eb661de4bf2748c",
  ],
  [
    "8f98d2aa9a0e4dc5b5bcc692415c5e63d43fb7454e4a77f5eef537adb022575e",
    "97eab764554bb5860e7acd9efa08a11321ed71d37e6c98f1be709c36bf1bd993",
  ],
  [
    "602041417fe64ccd4ad57ff7e3ea0f78f4228da06b926c2c7c91d84a8d4c7e6d",
    "630dcc26cdbd9696e6ed59d6a8655d73538700e17a76421fd29ab46c2ce21f59",
  ],
  [
    "af5bd41c78b1797abe1a775d29e0270a261fcfbe1acc74b81fcc0abfd75b0c14",
    "b99b5f6f9cd2e063824d7ace2fb0364c8852fd11ea29156614b1dab177ae9a89",
  ],
  [
    "13db94393a02046a5cf3508febefe05d34f7dac8dd81cc1b721d7a7ca0f3fc2e",
    "813a908bf921d37721131497b2a6d34080df398e3946d318b29e05767a50764f",
  ],
  [
    "6e13bb714e7437e416b9071387268b8f9383c68e08243ce98685fe5e3d91f523",
    "6e4c82958a92a845419ece17f4bcc45b30a56521afa027732f32070495d98181",
  ],
  [
    "04c6f618c4e7fa06f45336676c70971042328664fa2cd71a4e9a866b6e8a1126",
    "9a41d4c7a827f3748b7f8982dfbe16d5f15759e9876806f3245a22ae1fea494b",
  ],
]

/**跳转到登录 */
function jumpLogin() {
  //window.location.href = "/database/auth/auth/";
  if (getCookie('arrayClient') == 'notfound') {
    var x = new Date(
      new Date(new Date().toLocaleDateString()).getTime() +
        24 * 60 * 60 * 1000 -
        1
    )
    document.cookie = 'arrayClient=' + array_Client + '; path=/; expires=' + x //设置cookie
  }
  var client = array_Client[Math.floor(Math.random() * array_Client.length)]
  setCookie('currentClient', client)
  window.location.href =
    'https://gitee.com/oauth/authorize?client_id=' +
    client[0] +
    '&redirect_uri=https%3A%2F%2Fyuanshen.site%2Flogin.html&response_type=code'
}

/**
 * 获取 token
 *
 * true : 写入 tokenPara
 *
 * false: 跳转登录 / 使用本地离线
 *
 * @returns {true | false}
 */
function getToken() {
  if (getCookie('gitee_Token') != 'notfound') {
    if (isFirstLogin) {
      isFirstLogin = false
      tokenPara = getCookie('gitee_Token')
      getGistList()
    } else {
      window.frames[0].postMessage(
        {
          message: 'refreshGistList',
          files: user_files,
        },
        '*'
      )
    }
    return true
  } else {
    return false
  }
}

/**
 * 根据地址 token 判定登录跳转
 *
 * true : 写入 cookie 并跳转
 *
 */
function Login() {
  confirmSync = true
  isFirstLogin = true
  if (
    window.location.search !== undefined &&
    window.location.search != '' &&
    window.location.search.split('=')[0] !== '?locale'
  ) {
    let tempTokenPara = GetQueryString('access_token')
    setCookie('gitee_Token', tempTokenPara, 1)
    //return window.location.href = "https://yuanshen.site/Beta/index.html";
  }
}
/**
 * tokenPara 正确 调用上传存档
 *
 * 不正确 跳转登录 / 本地存档
 *
 * @param  {function} localSave
 */
function upLoadSaveData(localSave) {
  if (tokenPara !== undefined && tokenPara !== '') {
    var fileName = window.prompt('请输入存档名')
    if (fileName) {
      //console.log(fileName);
      checkFile(fileName)
    }
  } else {
    if (window.confirm('使用云存档必须登录, 要立刻登录吗?')) {
      jumpLogin()
    } else {
      //调用本地存档
      localSave()
    }
  }
}

/**
 * 内部函数 禁止外调
 */
function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')

  var r = window.location.search.substr(1).match(reg)

  if (r != null) return unescape(r[2])
  return null
}

//本地数据检测
// function getLocalStorageKey() {
//   if (localStorage.key(1) != null) {
//     var uid = window.prompt("检测到本地数据,请绑定原神UID");
//     if (uid != null && uid != "") {
// 	  user_fileNames.push(uid);
// 	  addNewFile();
//     } else {
//       var confirmDelete = window.confirm("绑定取消，删除本地数据？");
//       if (confirmDelete == true) {
//         var reConfirmDelete = window.confirm("真的要删除本地数据吗？");
//         if (reConfirmDelete == true) {
//           localStorage.clear();
//         }
//       } else {
//         //console.log("用户取消删除操作");
//       }
//     }
//   } else {
//     alert("没有本地数据");
//   }
// }

/**
 * 云端获取文件列表
 *
 */
function getFileList() {
  var url = '/database/file/getFileList'
  //var url = "/giteegist/";
  var access_token = ''

  if (tokenPara !== null) {
    access_token = tokenPara
  }
  var data = {
    access_token: access_token,
  }
  var success = function (res) {
    if (res.data === 'login') {
      alert('未登录gitee账号或者登录已过期！')
    } else {
      //console.log(res);
      user_fileNames = res.data.fileNames
      user_fileContents = res.data.fileContents
      user_fileIds = res.data.fileIds
      alert('同步完成')
      //console.log(user_fileNames);
      //console.log(user_fileContents);
      //console.log(user_fileIds);
    }
  }
  let err = function (msg) {
    alert(msg)
  }
  $.ajax({
    async: true,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
}

/**
 * 日期转化
 *
 */
function formatDate(date) {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var second = date.getSeconds()
  second = second < 10 ? '0' + second : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

/**
 * giteeGist获取用户信息
 *
 */
function getGitUser(cb) {
  var access_token = ''
  var success = function (res) {
    console.log('res', res)
    cb && cb(res)
    window.frames[0].postMessage(
      {
        message: 'refreshUser',
        userName: res.name,
      },
      '*'
    )
  }
  if (tokenPara != null) {
    access_token = tokenPara
    var url = '/giteeuser/?access_token=' + access_token
    $.ajax({
      async: true,
      type: 'GET',
      url: url,
      contentType: 'application/json',
      success: success,
    })
  }
}

/**
 * giteeGist获取文件列表
 *
 */
function getGistList() {
  var access_token = ''
  if (tokenPara != null) {
    access_token = tokenPara
    var url = '/giteegist/?access_token=' + access_token
    var err = function (res) {
      removeCookie('gitee_Token') //清空登录缓存
      tokenPara = null //清空登录缓存
      canOpenSave = false //不可打开存档框
      $('.savePop').hide() //关闭存档框
      //console.log(res);
      if (
        res.status == 401 &&
        res.responseJSON.message ==
          '401 Unauthorized: Application has exceeded the rate limit'
      ) {
        var msg = '当前客户端连接已超额，请点击确定自动分配其他客户端重新登录'
        if (confirm(msg) == true) {
          let currentClient = getCookie('currentClient').split(',')
          let currentClients = getCookie('arrayClient').split(',')
          if (currentClients.length > 1) {
            let index = currentClients.indexOf(currentClient[0])
            currentClients.splice(index, 1)
            let index2 = currentClients.indexOf(currentClient[1])
            currentClients.splice(index2, 1)
            var x = new Date(
              new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            )
            document.cookie =
              'arrayClient=' + currentClients + '; path=/; expires=' + x //设置cookie
            jumpLogin()
          } else {
            alert(
              '请重新登录'
            )
          }
        }
      } else if (res.status == 401) {
        var msg = '登录失效，请点击确定重新登录'
        if (confirm(msg) == true) {
          jumpLogin()
        }
      }
    }
    var success = function (res) {
      $('.loading').hide()
      canOpenSave = true
      var currentID = localStorage.getItem('lastUpdateID')
      var currentTime = localStorage.getItem('lastUpdateTime')
      var IDSync = false
      var TimeSync = false
      user_files = []
      //console.log(res);
      for (let obj of res) {
        let currentKey = Object.keys(obj.files)[0]
        if (currentKey == 'Data_KYJG') {
          var currentData = obj.files[Object.keys(obj.files)[0]].content
          //console.log(currentData);
          var lastUpdateTime = formatDate(new Date(obj.updated_at))
          //console.log(formatDate(lastUpdateTime));
          var description = obj.description
          //console.log(description);
          var id = obj.id
          //console.log(id);
          var tempFile = {
            id: id,
            description: description,
            lastUpdateTime: lastUpdateTime,
            data: currentData,
          }
          user_files.push(tempFile)
          if (currentID == id) {
            IDSync = true
            var tempLastUpdateTime = lastUpdateTime
            if (currentTime == lastUpdateTime) {
              TimeSync = true
            }
          }
        }
      }
      if (IDSync && !TimeSync && confirmSync) {
        confirmSync = false
        var msg =
          '检测到您的存档与云端存储时间不一致，要同步云端存档吗（点击确定同步云端存档）'
        if (confirm(msg) == true) {
          loadGistFile(currentID, tempLastUpdateTime)
          confirmSync = true
        } else {
          var msg = '要上传当前存档到云端吗（点击确定上传存档到云端并同步）'
          if (confirm(msg) == true) {
            confirmSync = true
            autoUpdateGistFile()
          } else {
            //console.log(user_files);
            window.frames[0].postMessage(
              {
                message: 'refreshGistList',
                files: user_files,
              },
              '*'
            )
          }
        }
      } else {
        //console.log(user_files);
        window.frames[0].postMessage(
          {
            message: 'refreshGistList',
            files: user_files,
          },
          '*'
        )
      }
      if (IDSync && TimeSync) {
        isSync = true
      } else {
        isSync = false
      }
      freshMarkerLayer()
    }
    $.ajax({
      async: false,
      type: 'GET',
      url: url,
      contentType: 'application/json',
      success: success,
      error: err,
    })
  }
}

/**
 *修改存档后同步保存本地设置 by giteeGist
 *
 *@param fileID {string} 当前需要上传的存档ID
 *
 * tips: 上传完成会调用 getGistList() 同步数据
 */
function updateLocalData(fileID, cb) {
  var url = '/giteegist/' + fileID + '?access_token=' + tokenPara
  var success = function (res) {
    //console.log(res);
    var lastUpdateTime = formatDate(new Date(res.updated_at))
    localStorage.setItem('lastUpdateTime', lastUpdateTime)
    localStorage.setItem('lastUpdateID', fileID)
    localStorage.setItem('NetSync', 'true')
    if (cb) {
      alert('保存成功！')
    }
    getGistList()
  }
  $.ajax({
    async: false,
    type: 'GET',
    url: url,
    contentType: 'application/json',
    success: success,
  })
}

/**
 *修改存档 by giteeGist
 *
 *@param fileID {string} 当前需要上传的存档ID
 *
 * tips: 上传完成会调用 getGistList() 同步数据
 */
function updateGistFile(fileID) {
  $('.loading').show()
  var access_token = ''
  if (tokenPara != null) {
    access_token = tokenPara
    var url = '/giteegist/?access_token=' + access_token
    var err = function (res) {
      removeCookie('gitee_Token') //清空登录缓存
      tokenPara = null //清空登录缓存
      canOpenSave = false //不可打开存档框
      $('.savePop').hide() //关闭存档框
      if (
        res.status == 401 &&
        res.responseJSON.message ==
          '401 Unauthorized: Application has exceeded the rate limit'
      ) {
        var msg = '当前客户端连接已超额，请点击确定自动分配其他客户端重新登录'
        if (confirm(msg) == true) {
          let currentClient = getCookie('currentClient').split(',')
          let currentClients = getCookie('arrayClient').split(',')
          if (currentClients.length > 1) {
            let index = currentClients.indexOf(currentClient[0])
            currentClients.splice(index, 1)
            let index2 = currentClients.indexOf(currentClient[1])
            currentClients.splice(index2, 1)
            var x = new Date(
              new Date(new Date().toLocaleDateString()).getTime() +
                24 * 60 * 60 * 1000 -
                1
            )
            document.cookie =
              'arrayClient=' + currentClients + '; path=/; expires=' + x //设置cookie
            jumpLogin()
          } else {
            alert(
              '请重新登录'
            )
          }
        }
      } else if (res.status == 401) {
        var msg = '登录失效，请点击确定重新登录'
        if (confirm(msg) == true) {
          jumpLogin()
        }
      }
    }
    var success = function (res) {
      canOpenSave = true
      var currentID = localStorage.getItem('lastUpdateID')
      var currentTime = localStorage.getItem('lastUpdateTime')
      var IDSync = false
      var TimeSync = false
      user_files = []
      //console.log(res);
      for (let obj of res) {
        let currentKey = Object.keys(obj.files)[0]
        if (currentKey == 'Data_KYJG') {
          var currentData = obj.files[Object.keys(obj.files)[0]].content
          //console.log(currentData);
          var lastUpdateTime = formatDate(new Date(obj.updated_at))
          //console.log(formatDate(lastUpdateTime));
          var description = obj.description
          //console.log(description);
          var id = obj.id
          //console.log(id);
          var tempFile = {
            id: id,
            description: description,
            lastUpdateTime: lastUpdateTime,
            data: currentData,
          }
          user_files.push(tempFile)
          if (currentID == id) {
            IDSync = true
            var tempLastUpdateTime = lastUpdateTime
            if (currentTime == lastUpdateTime) {
              TimeSync = true
            }
          }
        }
      }
      if (IDSync && !TimeSync && confirmSync) {
        confirmSync = false
        var msg =
          '检测到您的存档与云端存储时间不一致，要同步云端存档吗（点击确定同步云端存档）'
        if (confirm(msg) == true) {
          loadGistFile(currentID, tempLastUpdateTime)
          confirmSync = true
        } else {
          var msg = '要上传当前存档到云端吗（点击确定上传存档到云端并同步）'
          if (confirm(msg) == true) {
            confirmSync = true
            autoUpdateGistFile()
          } else {
            //console.log(user_files);
            window.frames[0].postMessage(
              {
                message: 'refreshGistList',
                files: user_files,
              },
              '*'
            )
          }
        }
      } else {
        //console.log(user_files);
        window.frames[0].postMessage(
          {
            message: 'refreshGistList',
            files: user_files,
          },
          '*'
        )
      }
      if (IDSync && TimeSync) {
        isSync = true
      } else {
        isSync = false
      }
      if (isSync && localStorage.getItem('NetSync') == 'false') {
        autoUpdateGistFile(true)
      } else if (isSync) {
        $('.loading').hide()
        alert('当前存档已是最新')
      } else {
        $('.loading').hide()
        console.log('未选择同步存档，未能自动同步')
      }
    }
    $.ajax({
      async: false,
      type: 'GET',
      url: url,
      contentType: 'application/json',
      success: success,
      error: err,
    })
  }

  /*$(".loading").show();
  var markersData = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  var success = function (msg, code, head) {
    //console.log(msg);
    //console.log(code);
    //console.log(head);
    updateLocalData(fileID);
    alert("保存成功！");
  };
  let err = function (msg, code, head) {
    //console.log(msg);
    //console.log(code);
    //console.log(head);
  };
  var markersJsonData = {
    content: JSON.stringify(markersData)
  };
  //console.log(JSON.stringify(markersJsonData));
  var url = "/giteegist/" + fileID;
  var fileName = "Data_KYJG";
  var data = '{"access_token": "' + tokenPara + '","files": {"' + fileName + '": ' + JSON.stringify(markersJsonData) + '}}';
  $.ajax({
    async: false,
    type: "PATCH",
    url: url,
    data: JSON.stringify(JSON.parse(data)),
    contentType: "application/json",
    success: success,
    error: err,
  });*/
}

/**
 *自动上传存档 by giteeGist
 *
 *
 * tips: 上传完成会调用 getGistList() 同步数据
 */
function autoUpdateGistFile(cb = false) {
  var fileID = localStorage.getItem('lastUpdateID')
  var markersData = []
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i) //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key) //所有value
  }
  var success = function (res) {
    updateLocalData(fileID, cb)
  }
  let err = function (msg) {
    //console.log(msg);
  }
  var markersJsonData = {
    content: JSON.stringify(transStampToId(markersData)),
  }
  //console.log(JSON.stringify(markersJsonData));
  var url = '/giteegist/' + fileID
  var fileName = 'Data_KYJG'
  var data =
    '{"access_token": "' +
    tokenPara +
    '","files": {"' +
    fileName +
    '": ' +
    JSON.stringify(markersJsonData) +
    '}}'
  $.ajax({
    async: false,
    type: 'PATCH',
    url: url,
    data: JSON.stringify(JSON.parse(data)),
    contentType: 'application/json',
    success: success,
    error: err,
  })
}

function checkAutoUpdate() {
  if (localStorage.getItem('NetSync') == 'false') {
    $('.loading').show()
    var access_token = ''
    if (tokenPara != null) {
      access_token = tokenPara
      var url = '/giteegist/?access_token=' + access_token
      var err = function (res) {
        removeCookie('gitee_Token') //清空登录缓存
        tokenPara = null //清空登录缓存
        canOpenSave = false //不可打开存档框
        $('.savePop').hide() //关闭存档框
        if (
          res.status == 401 &&
          res.responseJSON.message ==
            '401 Unauthorized: Application has exceeded the rate limit'
        ) {
          var msg = '当前客户端连接已超额，请点击确定自动分配其他客户端重新登录'
          if (confirm(msg) == true) {
            let currentClient = getCookie('currentClient').split(',')
            let currentClients = getCookie('arrayClient').split(',')
            if (currentClients.length > 1) {
              let index = currentClients.indexOf(currentClient[0])
              currentClients.splice(index, 1)
              let index2 = currentClients.indexOf(currentClient[1])
              currentClients.splice(index2, 1)
              var x = new Date(
                new Date(new Date().toLocaleDateString()).getTime() +
                  24 * 60 * 60 * 1000 -
                  1
              )
              document.cookie =
                'arrayClient=' + currentClients + '; path=/; expires=' + x //设置cookie
              jumpLogin()
            } else {
              alert(
                '请重新登录'
              )
            }
          }
        } else if (res.status == 401) {
          var msg = '登录失效，请点击确定重新登录'
          if (confirm(msg) == true) {
            jumpLogin()
          }
        }
      }
      var success = function (res) {
        canOpenSave = true
        var currentID = localStorage.getItem('lastUpdateID')
        var currentTime = localStorage.getItem('lastUpdateTime')
        var IDSync = false
        var TimeSync = false
        user_files = []
        //console.log(res);
        for (let obj of res) {
          let currentKey = Object.keys(obj.files)[0]
          if (currentKey == 'Data_KYJG') {
            var currentData = obj.files[Object.keys(obj.files)[0]].content
            //console.log(currentData);
            var lastUpdateTime = formatDate(new Date(obj.updated_at))
            //console.log(formatDate(lastUpdateTime));
            var description = obj.description
            //console.log(description);
            var id = obj.id
            //console.log(id);
            var tempFile = {
              id: id,
              description: description,
              lastUpdateTime: lastUpdateTime,
              data: currentData,
            }
            user_files.push(tempFile)
            if (currentID == id) {
              IDSync = true
              var tempLastUpdateTime = lastUpdateTime
              if (currentTime == lastUpdateTime) {
                TimeSync = true
              }
            }
          }
        }
        if (IDSync && !TimeSync && confirmSync) {
          confirmSync = false
          var msg =
            '检测到您的存档与云端存储时间不一致，要同步云端存档吗（点击确定同步云端存档）'
          if (confirm(msg) == true) {
            loadGistFile(currentID, tempLastUpdateTime)
            confirmSync = true
          } else {
            var msg = '要上传当前存档到云端吗（点击确定上传存档到云端并同步）'
            if (confirm(msg) == true) {
              confirmSync = true
              autoUpdateGistFile()
            } else {
              //console.log(user_files);
              window.frames[0].postMessage(
                {
                  message: 'refreshGistList',
                  files: user_files,
                },
                '*'
              )
            }
          }
        } else {
          //console.log(user_files);
          window.frames[0].postMessage(
            {
              message: 'refreshGistList',
              files: user_files,
            },
            '*'
          )
        }
        if (IDSync && TimeSync) {
          isSync = true
        } else {
          isSync = false
        }
        freshMarkerLayer()
        if (isSync) {
          autoUpdateGistFile()
        } else {
          $('.loading').hide()
          console.log('未选择同步存档，未能自动同步')
        }
      }
      $.ajax({
        async: true,
        type: 'GET',
        url: url,
        contentType: 'application/json',
        success: success,
        error: err,
      })
    } else {
      $('.loading').hide()
    }
  } else {
    console.log('地图数据无变化，没有进行自动同步')
  }
}
setInterval(() => checkAutoUpdate(), 300000)
/**
 *新建存档 by giteeGist
 *
 * tips: 新建完成会调用 getGistList() 同步数据
 */
function addGistFile(_default = '', cb) {
  var markersData = []
  if (isSync == false || isCopy === true) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i) //获取本地存储的Key
      // @ts-ignore
      if (localStorage.getItem(key) == 1) markersData.push(key) //所有value
    }
  }
  var markersJsonData = {
    content: JSON.stringify(transStampToId(markersData)),
  }
  var description = window.prompt('请输入存档名', _default)
  if (description) {
    var success = function (res) {
      if (isSync == false) {
        confirmSync = true
        var lastUpdateTime = formatDate(new Date(res.updated_at))
        localStorage.setItem('lastUpdateTime', lastUpdateTime)
        localStorage.setItem('lastUpdateID', res.id)
        localStorage.setItem('NetSync', 'true')
      }
      alert(isCopy ? '复制完成' : '新建完成')
      cb && cb(res)
      getGistList()
    }
    var err = function (res) {
      //console.log(res.responseJSON.message);
      if (
        res.responseJSON.message ==
        '您尚未认证身份，根据国家相关法律法规的要求，请绑定手机后再操作'
      ) {
        if (window.confirm('使用云存档必须绑定手机, 要立刻绑定吗?')) {
          BDSJ()
        }
      } else alert(res.responseJSON.message)
    }
    var url = '/giteegist/'
    var fileName = 'Data_KYJG'
    var data =
      '{"access_token": "' +
      tokenPara +
      '","description":"' +
      description +
      '","files": {"' +
      fileName +
      '": ' +
      JSON.stringify(markersJsonData) +
      '}}'
    //console.log(JSON.stringify(JSON.parse(data)));
    $.ajax({
      async: false,
      type: 'POST',
      url: url,
      data: JSON.stringify(JSON.parse(data)),
      contentType: 'application/json',
      success: success,
      error: err,
    })
  } else {
    isCopy = false
  }
}

function BDSJ() {
  window.location.href = 'https://gitee.com/profile/account_information'
}

/**
 *修改存档备注 by giteeGist
 *
 *@param fileID {string} 需要修改的存档ID
 *
 * tips: 修改完成会调用 getGistList() 同步数据
 */
function updateGistDescription(fileID) {
  var description = window.prompt('（修改存档名）请输入存档名')
  if (description) {
    var success = function (res) {
      //console.log(res);
      if (res.id == localStorage.getItem('lastUpdateID')) {
        let lastUpdateTime = formatDate(new Date(res.updated_at))
        localStorage.setItem('lastUpdateTime', lastUpdateTime)
      }
      alert('修改备注成功！')
      getGistList()
    }
    let err = function (msg) {
      //console.log(msg);
    }
    var url = '/giteegist/' + fileID
    var data =
      '{"access_token": "' +
      tokenPara +
      '","description":"' +
      description +
      '"}'
    $.ajax({
      async: false,
      type: 'PATCH',
      url: url,
      data: JSON.stringify(JSON.parse(data)),
      contentType: 'application/json',
      success: success,
      error: err,
    })
  }
}

/**
 *删除存档 by giteeGis
 *
 *@param fileID {string} 需要删除的存档ID
 *
 * tips: 删除完成会调用 getGistList() 同步数据
 * 删除会丢失之前的存档，如需要请加不可恢复提示
 */
function deleteGistFile(fileID) {
  var msg = '存档删除后不可恢复，您确定要删除这个存档吗？'
  if (confirm(msg) == true) {
    var success = function (res) {
      //console.log(res);
      alert('删除完成！')
      getGistList()
    }
    let err = function (msg) {
      //console.log(msg);
    }
    var url = '/giteegist/' + fileID + '?access_token=' + tokenPara
    $.ajax({
      async: false,
      type: 'DELETE',
      url: url,
      contentType: 'application/json',
      success: success,
      error: err,
    })
  }
}

/**
 *加载存档 by giteeGis
 *
 *@param fileID {string} 需要加载的存档ID
 *@param fileLastUpdateTime {string} 需要加载的存档更新时间
 *
 * tips: 删除完成会调用 getGistList() 同步数据
 * 导入会丢失现在存档，如需要请加备份提示
 *
 */
function loadGistFile(fileID, fileLastUpdateTime) {
  var markersData = []
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i) //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key) //所有value
  }
  if (isSync == false && markersData.length >= 1 && confirmSync == true) {
    var msg =
      '您本地存有数据且未处于同步状态，为防止数据丢失，请点击确定新建存档'
    if (confirm(msg) == true) {
      addGistFile()
    }
  } else {
    for (let file of user_files) {
      if (file.id == fileID) {
        localStorage.clear()
        // @ts-ignore
        var markerLogArr = eval(file.data)
        for (var i = 0; i < markerLogArr.length; i++) {
          var currentMarker = markerLogArr[i]
          var currentMarkerStamp = transIdToStampSingle(currentMarker)
          if(currentMarkerStamp) {
            localStorage.setItem(currentMarkerStamp, '1')
          }
        }
        localStorage.setItem('lastUpdateTime', fileLastUpdateTime)
        localStorage.setItem('lastUpdateID', fileID)
        localStorage.setItem('NetSync', 'true')
        alert('导入该存档成功!')
        getGistList()
      }
    }
  }
}

/**
 *判断存档是修改还是新增
 *
 *@param fileName {string} 当前需要上传的存档名
 *
 * tips: 上传完成会调用 getFileList() 同步数据
 */
function checkFile(fileName) {
  let isUpdate = false
  let fileIndex = 0
  for (let name of user_fileNames) {
    //console.log(name)
    if (name == fileName) {
      var fileID = user_fileIds[fileIndex]
      isUpdate = true
      break
    }
    fileIndex++
  }
  if (isUpdate) {
    updateFile(fileName, fileID)
  } else {
    addNewFile(fileName)
  }
}

/**
 *上传存档
 *
 *@param fileName {string} 当前需要上传的存档名
 *
 * tips: 上传完成会调用 getFileList() 同步数据
 */
function addNewFile(fileName) {
  var markersData = []
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i) //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key) //所有value
  }
  var success = function (res) {
    if (res === 'login') {
      alert('未登录gitee账号或者登录已过期！')
    } else {
      // if (user_fileNames.length == 0) {
      //   uid = window.prompt("请输入第一个原神UID");
      //   if (uid != null && uid != "") {
      //     user_fileNames.push(uid);
      //   }
      // } else {
      //   uid = window.prompt("增加一个原神UID");
      //   if (uid != null && uid != "") {
      //     user_fileNames.push(uid);
      //   }
      // }
      //把存档的值存储(请根据实际情况修改这部分)
      alert('上传完成')
      getFileList()
    }
  }
  let err = function (msg) {
    alert(msg)
  }
  var url = '/database/file/addNewFile'
  var data = {
    access_token: tokenPara,
    fileName: fileName,
    fileContent: markersData,
  }
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
}

/**
 *修改存档
 *@param fileName {string} 当前需要修改的存档名
 *@param fileID {string} 当前需要修改的存档ID
 *修改会丢失之前的存档，如需要请加备份提示
 */
function updateFile(fileName, fileID) {
  var markersData = []
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i) //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key) //所有value
  }
  var success = function (res) {
    if (res === 'login') {
      alert('未登录gitee账号或者登录已过期！')
    } else {
      //console.log(res);
      alert('保存成功！')
      getFileList()
    }
  }
  let err = function (msg) {
    //console.log(msg);
  }
  var markersJsonData = {
    content: JSON.stringify(markersData),
  }
  //console.log(JSON.stringify(markersJsonData));
  var url = '/giteegist/' + fileID
  var data =
    '{"access_token": "' +
    tokenPara +
    '","files": {"' +
    fileName +
    '": ' +
    JSON.stringify(markersJsonData) +
    '}}'
  $.ajax({
    async: false,
    type: 'PATCH',
    url: url,
    data: JSON.stringify(JSON.parse(data)),
    contentType: 'application/json',
    success: success,
    error: err,
  })
}

/*
	导入存档
	不需要调后台，因为查过了，number传入当前需要导入的存档在数组中的序号
	导入会丢失现在存档，如需要请加备份提示
*/
function loadFile(number) {
  localStorage.clear()
  // @ts-ignore
  var markerLogArr = user_fileContents(number)
  for (var i = 0; i < markerLogArr.length; i++) {
    var currentMarker = markerLogArr[i]
    var currentMarkerStamp = transIdToStampSingle(currentMarker)
    if(currentMarkerStamp) {
      localStorage.setItem(currentMarkerStamp, '1')
    }
  }
  alert('导入该存档成功!')
}

/*
  删除存档，number传入当前需要导入的存档在数组中的序号
  <注意：这个是调接口的删除，未上传的存档删除直接从数组中delete就行>
*/
function deleteFile(number) {
  var markersData = []
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i) //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key) //所有value
  }
  var url = '/database/file/deleteFile'
  var data = {
    access_token: tokenPara,
    fileId: user_fileIds[number],
  }
  var success = function (res) {
    if (res === 'login') {
      alert('未登录gitee账号或者登录已过期！')
    } else {
      //把存档的值删除(请根据实际情况修改这部分)
      user_fileNames.splice(number, 1)
      user_fileContents.splice(number, 1)
      user_fileIds.splice(number, 1)
    }
  }
  let err = function (msg) {
    alert(msg)
  }
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
}

/**
 * 添加issue
 * @param issueName {string} 提交的issue标题，可以为资源名，如蒙德宝箱164
 * @param issueContent {string | string[]}issue的具体内容
 * @param issueLabels {string | string[]} issue的标签逗号隔开 如 "宝箱,错点"
 */
function createIssue(issueName, issueContent, issueLabels) {
  var url = '/database/file/createIssue'
  var data = {
    access_token: tokenPara,
    issueName: issueName,
    issueContent: issueContent,
    issueLabels: issueLabels,
  }
  var success = function (res) {
    if (res === 'login') {
      alert('未登录gitee账号或者登录已过期！')
    } else {
      alert('提交成功！')
    }
  }
  let err = function (msg) {
    alert(msg)
  }
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
}

/*
	上传base64文件：未测试
*/
function uploadBase64(filePath, fileName, imgBase64) {
  var url = '/database/upload/uploadBase64'
  var data = {
    filePath: filePath,
    fileName: fileName,
    imgBase64: imgBase64,
  }
  var success = function (res) {
    alert('操作完成!')
  }
  let err = function (msg) {
    alert(msg)
  }
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
}
