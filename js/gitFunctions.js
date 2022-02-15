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
              '当前所有客户端连接数均已超额，请联系管理员添加客户端QQ790489566'
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
              '当前所有客户端连接数均已超额，请联系管理员添加客户端QQ790489566'
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
    content: JSON.stringify(markersData),
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
                '当前所有客户端连接数均已超额，请联系管理员添加客户端QQ790489566'
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
    content: JSON.stringify(markersData),
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
          localStorage.setItem(markerLogArr[i], '1')
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
    localStorage.setItem(markerLogArr[i], '1')
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
