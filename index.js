window.addEventListener("DOMContentLoaded", init);
//*{margin:0;background-color:#00000000

function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 箱を作成
  const geometry = new THREE.BoxGeometry(500, 500, 500);
  const material = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
  });
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 平行光源
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    box.rotation.x += 0.01;
    box.rotation.y += 0.09;

    // レンダリング
    renderer.render(scene, camera);
  }
  // render() の後に以下を実行
  TWEEN.autoPlay(true);

  // TWEEN.autoPlayの後に以下を実行
  var origin_pos = cube.position.clone();
  var move_axis = "x"; // 移動方向
  var move_offset = cube_size; // 移動距離
  var from_param = { x: 0 }; // tween開始時の値
  var to_param = { x: 1 }; // tween終了時の値
  var duration = 1000; // 単位はミリ秒
  var tween = new TWEEN.Tween(from_param)
    .to(to_param, duration)
    .easing(TWEEN.Easing.Linear)
    .on("update", ({ x }) => {
      // xには0～1までの値がカウントアップしながら渡されてくる
      cube.position[move_axis] =
        origin_pos[move_axis] + x * cube_size * move_offset;
    });
  tween.start();
}
