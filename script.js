document.addEventListener('DOMContentLoaded', () => {
    const zimakuContainer = document.querySelector('.zimaku');
    var chartime = 0.07;
    // zimakuクラスを持つ要素が存在するかチェック
    if (!zimakuContainer) {
        console.error('エラー: <div class="zimaku"> がHTML内に見つかりません。');
        return;
    }

    // アニメーション用のスタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        .zimaku span.animate {
            display: inline-block;
            animation: fadeIn 0.5s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

    // 1. zimakuコンテナの子要素を取得し、リスト(配列)に格納
    const sourceElements = Array.from(zimakuContainer.children);
    const zimakuList = [];

    // 文字数に基づく表示時間の計算関数
    function calculateDuration(text) {
        // 基本表示時間: 1文字あたり0.3秒 + 基本時間2秒
        return text.length * chartime ;
    }

    sourceElements.forEach(element => {
        const durationAttr = element.dataset.duration;
        let duration;

        if (element.tagName === 'P') {
            // 手動設定がある場合はその値を追加時間として使用
            const baseTime = calculateDuration(element.textContent || '');
            const additionalTime = !isNaN(parseFloat(durationAttr)) ? parseFloat(durationAttr) : 2;
            duration = baseTime + additionalTime;
        } else {
            // 画像の場合は従来通り
            duration = !isNaN(parseFloat(durationAttr)) ? parseFloat(durationAttr) : 0.5;
        }

        if (element.tagName === 'P') {
            zimakuList.push({
                type: 'p',
                content: element.textContent || '',
                duration: duration
            });
        } else if (element.tagName === 'IMG') {
            const src = element.getAttribute('src');
            zimakuList.push({
                type: 'img',
                content: src,
                duration: duration
            });
        }
    });

    // 2. 元のzimakuコンテナの中身を空にする
    zimakuContainer.innerHTML = '';
    zimakuContainer.style.display = 'block';
    let currentIndex = 0;
    let timeoutId = null;
    let currentText = ''; // 現在の文字列を保持する変数

    // 戻るボタンを作成
    const backButton = document.createElement('button');
    backButton.textContent = '前に戻る';
    backButton.style.position = 'fixed';
    backButton.style.top = '20px';
    backButton.style.left = '20px';
    document.body.appendChild(backButton);

    // 戻るボタンのクリックイベント
    backButton.addEventListener('click', () => {
        if (currentIndex > 1) {
            clearTimeout(timeoutId);
            currentIndex -= 2;
            showNextItem();
        }
    });

    // 3. 要素を一つずつ表示/実行する関数
    function showNextItem() {
        if (currentIndex >= zimakuList.length) {
            console.log('字幕表示が完了しました。');
            return;
        }

        const item = zimakuList[currentIndex];
        let delay = item.duration * 1000;

        console.log(`表示 (${currentIndex + 1}/${zimakuList.length}): `, item);

        if (item.type === 'p') {
            currentText = item.content;
            zimakuContainer.innerHTML = '';
            // 文字を1文字ずつspanで囲む
            [...currentText].forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                zimakuContainer.appendChild(span);
                
                // 少しずつ遅延させて文字をアニメーション
                setTimeout(() => {
                    span.classList.add('animate');
                }, i * chartime *1000);
            });
        } else if (item.type === 'img') {
            if (item.content === '') {
                document.body.style.backgroundImage = 'none';
            } else {
                document.body.style.backgroundImage = `url('${item.content}')`;
            }
            // 画像変更時も現在のテキストを維持
            const spans = zimakuContainer.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('animate'));
        }

        currentIndex++;
        timeoutId = setTimeout(showNextItem, delay);
    }

    // 4. 最初の要素から表示を開始
    if (zimakuList.length > 0) {
        showNextItem();
    } else {
        console.log('表示する字幕要素がありません。');
    }
});